/**
 * GET /api/auth/session
 * Checks the status of the current demo viewing session,
 * returning remaining seconds, expiration timestamp, and cafe slug.
 */

const { verifySession, parseCookies } = require('../../lib/crypto');
const { getKey } = require('../../lib/storage');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    const cookies = parseCookies(req);
    const token = cookies.demo_session;

    if (!token) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ active: false, reason: 'no_session' }));
    }

    const verification = verifySession(token);
    if (!verification) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ active: false, reason: 'invalid_signature' }));
    }

    const { valid, expired, payload } = verification;
    const now = Date.now();

    if (expired || !valid || now >= payload.expiresAt) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        active: false,
        expired: true,
        reason: 'time_expired',
        expiresAt: payload.expiresAt
      }));
    }

    // Verify key status against DB in case it was revoked remotely by admin
    const keyRecord = await getKey(payload.key);
    if (!keyRecord || keyRecord.status === 'revoked') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        active: false,
        revoked: true,
        reason: 'revoked_by_admin'
      }));
    }

    const remainingMs = Math.max(0, payload.expiresAt - now);
    const remainingSeconds = Math.floor(remainingMs / 1000);

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });

    return res.end(JSON.stringify({
      active: true,
      cafe: payload.cafe,
      key: payload.key,
      expiresAt: payload.expiresAt,
      remainingSeconds
    }));

  } catch (error) {
    console.error('[API /auth/session] Error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Internal server error' }));
  }
};
