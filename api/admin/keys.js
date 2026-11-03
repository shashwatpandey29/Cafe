/**
 * /api/admin/keys
 * Executive Key Generation & Session Administration API
 * Gated by HMAC Signed Admin Cookie or Timing-Safe Authorization Header.
 */

const crypto = require('crypto');
const { listKeys, getKey, saveKey, deleteKey } = require('../../lib/storage');
const { generateIdentityKey, verifySession, parseCookies } = require('../../lib/crypto');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'NeroAdmin#2026!Key';

function timingSafeCheck(input, secret) {
  if (typeof input !== 'string' || typeof secret !== 'string') return false;
  const inputBuffer = Buffer.from(input, 'utf-8');
  const secretBuffer = Buffer.from(secret, 'utf-8');
  if (inputBuffer.length !== secretBuffer.length) {
    crypto.timingSafeEqual(inputBuffer, inputBuffer);
    return false;
  }
  return crypto.timingSafeEqual(inputBuffer, secretBuffer);
}

function checkAdminAuth(req) {
  // 1. Check HTTP-only signed admin_session cookie
  const cookies = parseCookies(req);
  if (cookies.admin_session) {
    const verified = verifySession(cookies.admin_session);
    if (verified && verified.valid && verified.payload && verified.payload.role === 'admin') {
      return true;
    }
  }

  // 2. Check Authorization header with timing-safe check
  const authHeader = req.headers['authorization'] || '';
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const headerKey = req.headers['x-admin-key'];
  const provided = (bearerMatch && bearerMatch[1]) || headerKey;

  if (provided && timingSafeCheck(provided, ADMIN_PASSWORD)) {
    return true;
  }

  return false;
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (e) { resolve({}); }
    });
    setTimeout(() => { if (!body) resolve({}); }, 500);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (!checkAdminAuth(req)) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Unauthorized: Admin authentication required.' }));
  }

  const now = Date.now();

  try {
    // GET: List all keys with dynamic computed status
    if (req.method === 'GET') {
      const keys = await listKeys();
      const enriched = keys.map(k => {
        let computedStatus = k.status;
        let remainingSeconds = 0;

        if (k.status === 'revoked') {
          computedStatus = 'revoked';
        } else if (k.expiresAt && now >= k.expiresAt) {
          computedStatus = 'expired';
        } else if (k.status === 'active' && k.expiresAt && now < k.expiresAt) {
          computedStatus = 'active';
          remainingSeconds = Math.floor((k.expiresAt - now) / 1000);
        } else if (!k.firstActivatedAt) {
          computedStatus = 'pending';
        }

        return {
          ...k,
          computedStatus,
          remainingSeconds
        };
      }).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ keys: enriched }));
    }

    // POST: Manage keys (generate, extend, revoke, delete)
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const action = body.action || 'generate';

      if (action === 'generate') {
        const { cafe, clientName, durationMinutes = 60 } = body;
        if (!cafe) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Please select a cafe.' }));
        }

        let prefix = 'DEMO';
        if (cafe === 'caffe-nero') prefix = 'NERO';
        else if (cafe === 'one-club-row') prefix = 'OCR';
        else if (cafe === 'yeah-man-caribbean') prefix = 'YMC';

        const key = generateIdentityKey(prefix);
        const record = {
          key,
          cafe,
          clientName: clientName || `${prefix} Prospect`,
          durationMinutes: parseInt(durationMinutes, 10) || 60,
          status: 'pending',
          createdAt: now,
          firstActivatedAt: null,
          expiresAt: null,
          revokedAt: null
        };

        await saveKey(record);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true, key: record }));
      }

      if (action === 'extend') {
        const { key, additionalMinutes = 30 } = body;
        const record = await getKey(key);
        if (!record) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Key not found' }));
        }

        const baseTime = (record.expiresAt && record.expiresAt > now) ? record.expiresAt : now;
        record.expiresAt = baseTime + (parseInt(additionalMinutes, 10) * 60 * 1000);
        record.status = 'active';
        if (!record.firstActivatedAt) record.firstActivatedAt = now;
        record.revokedAt = null;

        await saveKey(record);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true, key: record }));
      }

      if (action === 'revoke') {
        const { key } = body;
        const record = await getKey(key);
        if (!record) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Key not found' }));
        }

        record.status = 'revoked';
        record.revokedAt = now;
        await saveKey(record);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true, key: record }));
      }

      if (action === 'delete') {
        const { key } = body;
        await deleteKey(key);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true }));
      }

      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: `Unknown action: ${action}` }));
    }

    if (req.method === 'DELETE') {
      const body = await parseBody(req);
      if (body.key) {
        await deleteKey(body.key);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: true }));
    }

    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));

  } catch (error) {
    console.error('[API /admin/keys] Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Internal admin API error' }));
  }
};
