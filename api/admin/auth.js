/**
 * /api/admin/auth
 * Hardened Admin Authentication Controller
 * Includes IP Rate Limiting, Timing-Safe Password Verification, and Signed Session Cookies.
 */

const crypto = require('crypto');
const { signSession, verifySession, serializeCookie, parseCookies } = require('../../lib/crypto');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'NeroAdmin#2026!Key';

// Rate limiting map: ip -> { failedAttempts, lockoutUntil }
const loginAttempts = new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : '127.0.0.1';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry) return { allowed: true };

  if (entry.lockoutUntil && now < entry.lockoutUntil) {
    const remainingMins = Math.ceil((entry.lockoutUntil - now) / 60000);
    return {
      allowed: false,
      error: `Too many failed login attempts. This IP is locked out for ${remainingMins} more minute(s).`
    };
  }

  // Reset if lockout period has passed
  if (entry.lockoutUntil && now >= entry.lockoutUntil) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordFailedAttempt(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip) || { failedAttempts: 0 };
  entry.failedAttempts += 1;

  if (entry.failedAttempts >= 5) {
    entry.lockoutUntil = now + (15 * 60 * 1000); // 15 minute lockout
  }
  loginAttempts.set(ip, entry);
}

function recordSuccessfulAttempt(ip) {
  loginAttempts.delete(ip);
}

function timingSafeCheck(input, secret) {
  if (typeof input !== 'string' || typeof secret !== 'string') return false;
  const inputBuffer = Buffer.from(input, 'utf-8');
  const secretBuffer = Buffer.from(secret, 'utf-8');
  if (inputBuffer.length !== secretBuffer.length) {
    // Constant time dummy check to avoid timing leak
    crypto.timingSafeEqual(inputBuffer, inputBuffer);
    return false;
  }
  return crypto.timingSafeEqual(inputBuffer, secretBuffer);
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
  const ip = getClientIp(req);
  const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);

  // GET: Check active admin session status
  if (req.method === 'GET') {
    const cookies = parseCookies(req);
    const token = cookies.admin_session;
    if (!token) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ authenticated: false }));
    }

    const verification = verifySession(token);
    if (!verification || !verification.valid || verification.payload.role !== 'admin') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ authenticated: false }));
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      authenticated: true,
      expiresAt: verification.payload.expiresAt
    }));
  }

  // POST: Login or Logout
  if (req.method === 'POST') {
    const body = await parseBody(req);
    const action = body.action || 'login';

    if (action === 'logout') {
      const cookieHeader = serializeCookie('admin_session', '', {
        maxAge: 0,
        expires: new Date(0),
        secure: isProduction,
        httpOnly: true,
        sameSite: 'Strict',
        path: '/'
      });
      res.statusCode = 200;
      res.setHeader('Set-Cookie', cookieHeader);
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
    }

    // Login action
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      res.statusCode = 429;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: rateCheck.error }));
    }

    const password = body.password;
    const isValid = timingSafeCheck(password, ADMIN_PASSWORD);

    if (!isValid) {
      recordFailedAttempt(ip);
      // Artificial delay against brute-force attacks
      await new Promise(r => setTimeout(r, 600));

      const entry = loginAttempts.get(ip);
      const remainingAttempts = entry ? Math.max(0, 5 - entry.failedAttempts) : 4;

      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        error: `Invalid admin password. ${remainingAttempts} attempt(s) remaining before temporary lockout.`
      }));
    }

    // Success
    recordSuccessfulAttempt(ip);

    // 4-Hour Admin Session
    const expiresAt = Date.now() + (4 * 3600 * 1000);
    const token = signSession({
      role: 'admin',
      ip,
      expiresAt
    });

    const cookieHeader = serializeCookie('admin_session', token, {
      maxAge: 4 * 3600,
      secure: isProduction,
      httpOnly: true,
      sameSite: 'Strict',
      path: '/'
    });

    res.statusCode = 200;
    res.setHeader('Set-Cookie', cookieHeader);
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: true,
      authenticated: true,
      expiresAt
    }));
  }

  res.statusCode = 405;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
};
