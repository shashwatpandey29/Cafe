/**
 * GET /api/auth/session
 * Checks the status of the current demo viewing session,
 * syncs heartbeats (marking client online), and returns remaining seconds.
 */

const { verifySession, parseCookies } = require('../../lib/crypto');
const { getKey, saveKey } = require('../../lib/storage');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    const cookies = parseCookies(req);
    const token = cookies.demo_session;

    if (!token) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ active: false, reason: 'no_session' }));
    }

    const verification = verifySession(token);
    if (!verification) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ active: false, reason: 'invalid_signature' }));
    }

    const { valid, expired, payload } = verification;
    const now = Date.now();

    if (expired || !valid || now >= payload.expiresAt) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
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
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        active: false,
        revoked: true,
        reason: 'revoked_by_admin'
      }));
    }

    // Update real-time heartbeat telemetry
    keyRecord.lastActiveAt = now;
    await saveKey(keyRecord);

    const remainingMs = Math.max(0, payload.expiresAt - now);
    const remainingSeconds = Math.floor(remainingMs / 1000);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

    return res.end(JSON.stringify({
      active: true,
      cafe: payload.cafe,
      key: payload.key,
      expiresAt: payload.expiresAt,
      remainingSeconds
    }));

  } catch (error) {
    console.error('[API /auth/session] Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Internal server error' }));
  }
};
