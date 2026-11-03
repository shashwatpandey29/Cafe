/**
 * POST /api/auth/logout
 * Clears demo session cookie
 */

const { serializeCookie } = require('../../lib/crypto');

module.exports = async function handler(req, res) {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieHeader = serializeCookie('demo_session', '', {
    maxAge: 0,
    expires: new Date(0),
    secure: isProduction,
    httpOnly: true,
    sameSite: 'Lax',
    path: '/'
  });

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Set-Cookie': cookieHeader
  });

  return res.end(JSON.stringify({ success: true }));
};
