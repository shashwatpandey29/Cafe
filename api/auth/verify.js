/**
 * POST /api/auth/verify
 * Validates Identity Key, activates 1-hour timer upon first entry,
 * and sets signed HTTP-only session cookie.
 */

const { getKey, saveKey } = require('../../lib/storage');
const { signSession, serializeCookie } = require('../../lib/crypto');

// Helper to parse JSON body across Vercel serverless and Node http
async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    const body = await parseBody(req);
    const rawKey = body.key;

    if (!rawKey || typeof rawKey !== 'string' || !rawKey.trim()) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Please enter a valid identity key.' }));
    }

    const keyRecord = await getKey(rawKey);
    if (!keyRecord) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        error: 'Identity key not recognized. Please check your passcode and try again.'
      }));
    }

    const now = Date.now();

    // 1. Check if manually revoked
    if (keyRecord.status === 'revoked') {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        error: 'This demo pass has been deactivated. Please contact your representative for a new pass.',
        revoked: true
      }));
    }

    // 2. Check if expired (either marked expired, or expiresAt has passed)
    if (keyRecord.status === 'expired' || (keyRecord.expiresAt && now >= keyRecord.expiresAt)) {
      if (keyRecord.status !== 'expired') {
        keyRecord.status = 'expired';
        await saveKey(keyRecord);
      }
      res.writeHead(403, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        error: 'This demo pass has reached its 1-hour viewing limit and has permanently expired.',
        expired: true,
        expiredAt: keyRecord.expiresAt
      }));
    }

    let expiresAt = keyRecord.expiresAt;
    let durationMinutes = keyRecord.durationMinutes || 60;

    // 3. First activation (starts the 1-hour timer!)
    if (!keyRecord.firstActivatedAt) {
      keyRecord.firstActivatedAt = now;
      keyRecord.expiresAt = now + (durationMinutes * 60 * 1000);
      keyRecord.status = 'active';
      expiresAt = keyRecord.expiresAt;
      await saveKey(keyRecord);
    }

    const remainingMs = Math.max(0, expiresAt - now);
    const remainingSeconds = Math.floor(remainingMs / 1000);

    // 4. Issue signed cryptographic session token
    const token = signSession({
      key: keyRecord.key,
      cafe: keyRecord.cafe,
      expiresAt
    });

    const isProduction = process.env.NODE_ENV === 'production';
    const cookieHeader = serializeCookie('demo_session', token, {
      maxAge: remainingSeconds,
      secure: isProduction,
      httpOnly: true,
      sameSite: 'Lax',
      path: '/'
    });

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': cookieHeader
    });

    return res.end(JSON.stringify({
      success: true,
      cafe: keyRecord.cafe,
      clientName: keyRecord.clientName,
      redirectUrl: `/demo/${keyRecord.cafe}`,
      expiresAt,
      remainingSeconds
    }));

  } catch (error) {
    console.error('[API /auth/verify] Error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Internal server verification error' }));
  }
};
