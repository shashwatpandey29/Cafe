/**
 * Local Development Server for Private Demo Gateway
 * Exactly mimics Vercel serverless functions, rewrites, and static serving.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const verifyHandler = require('./api/auth/verify');
const sessionHandler = require('./api/auth/session');
const logoutHandler = require('./api/auth/logout');
const adminKeysHandler = require('./api/admin/keys');
const adminAuthHandler = require('./api/admin/auth');
const serveDemoHandler = require('./api/serve-demo');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function serveStatic(res, filePath) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    return res.end('404 Not Found');
  }
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = reqUrl.pathname;
  req.query = Object.fromEntries(reqUrl.searchParams.entries());

  // 1. API Route Handlers
  if (pathname === '/api/auth/verify') {
    return verifyHandler(req, res);
  }
  if (pathname === '/api/auth/session') {
    return sessionHandler(req, res);
  }
  if (pathname === '/api/auth/logout') {
    return logoutHandler(req, res);
  }
  if (pathname === '/api/admin/auth') {
    return adminAuthHandler(req, res);
  }
  if (pathname === '/api/admin/keys') {
    return adminKeysHandler(req, res);
  }

  // 2. Demo Gatekeeper Routing (/demo/:cafe/...)
  if (pathname.startsWith('/demo/')) {
    const parts = pathname.split('/').filter(Boolean);
    req.query.cafe = parts[1];
    if (parts[2]) {
      req.query.file = parts.slice(2).join('/');
    }
    return serveDemoHandler(req, res);
  }

  // 3. Static Pages & Rewrites
  if (pathname === '/' || pathname === '/index.html') {
    return serveStatic(res, path.join(__dirname, 'public', 'index.html'));
  }
  if (pathname === '/admin' || pathname === '/admin.html') {
    return serveStatic(res, path.join(__dirname, 'public', 'admin.html'));
  }
  if (pathname === '/expired' || pathname === '/expired.html') {
    return serveStatic(res, path.join(__dirname, 'public', 'expired.html'));
  }
  if (pathname === '/gate.css') {
    return serveStatic(res, path.join(__dirname, 'public', 'gate.css'));
  }
  if (pathname === '/guardian.js') {
    return serveStatic(res, path.join(__dirname, 'public', 'guardian.js'));
  }

  // Check if file exists in public/
  const publicPath = path.join(__dirname, 'public', pathname.replace(/^\/+/, ''));
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    return serveStatic(res, publicPath);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end('404 Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n======================================================`);
  console.log(`🚀 PRIVATE DEMO GATEWAY RUNNING LOCALLY`);
  console.log(`📍 Client Access Portal:  http://localhost:${PORT}/`);
  console.log(`⚡ Admin Control Console:  http://localhost:${PORT}/admin`);
  console.log(`======================================================\n`);
});
