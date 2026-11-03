/**
 * Cryptographic Token and Cookie Security Engine
 * Zero external dependencies — pure Node.js crypto
 */

const crypto = require('crypto');

const SECRET = process.env.SESSION_SECRET || 'cafe-enterprise-demo-secret-key-32-chars-long!';

/**
 * Base64URL encoder
 */
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Base64URL decoder
 */
function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

/**
 * Sign payload with HMAC-SHA256
 */
function signSession(payload) {
  const jsonStr = JSON.stringify(payload);
  const data = base64UrlEncode(jsonStr);
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(data);
  const sig = base64UrlEncode(hmac.digest());
  return `${data}.${sig}`;
}

/**
 * Verify and decode HMAC-SHA256 signed session token
 */
function verifySession(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [data, sig] = parts;
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(data);
  const expectedSig = base64UrlEncode(hmac.digest());

  // Timing safe comparison to avoid side-channel attacks
  const bufA = Buffer.from(sig);
  const bufB = Buffer.from(expectedSig);
  if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(data));
    const isExpired = Date.now() >= payload.expiresAt;
    return {
      valid: !isExpired,
      expired: isExpired,
      payload
    };
  } catch (e) {
    return null;
  }
}

/**
 * Parse HTTP Cookie header
 */
function parseCookies(req) {
  const list = {};
  const rc = req.headers && (req.headers.cookie || req.headers.Cookie);
  if (!rc) return list;

  rc.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts.shift().trim();
    const val = decodeURIComponent(parts.join('='));
    list[name] = val;
  });
  return list;
}

/**
 * Serialize a Set-Cookie header
 */
function serializeCookie(name, val, options = {}) {
  let cookie = `${name}=${encodeURIComponent(val)}`;
  if (options.maxAge) cookie += `; Max-Age=${Math.floor(options.maxAge)}`;
  if (options.expires) cookie += `; Expires=${options.expires.toUTCString()}`;
  if (options.httpOnly !== false) cookie += '; HttpOnly';
  if (options.secure) cookie += '; Secure';
  cookie += `; Path=${options.path || '/'}`;
  cookie += `; SameSite=${options.sameSite || 'Lax'}`;
  return cookie;
}

/**
 * Generate human-friendly, high-entropy identity keys
 * e.g., NERO-8F42-9K2
 */
function generateIdentityKey(prefix = 'DEMO') {
  const randomChars = crypto.randomBytes(4).toString('hex').toUpperCase();
  const chunk1 = randomChars.slice(0, 4);
  const chunk2 = crypto.randomBytes(2).toString('hex').toUpperCase();
  const cleanPrefix = prefix.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 4);
  return `${cleanPrefix}-${chunk1}-${chunk2}`;
}

module.exports = {
  signSession,
  verifySession,
  parseCookies,
  serializeCookie,
  generateIdentityKey
};
