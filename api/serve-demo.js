/**
 * /api/serve-demo
 * Secure Serverless Gatekeeper Handler
 * Serves Cafe Demos ONLY if the caller holds a valid, active, non-expired session cookie
 * matching the requested cafe.
 */

const fs = require('fs');
const path = require('path');
const { verifySession, parseCookies } = require('../lib/crypto');
const { getKey } = require('../lib/storage');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const ALLOWED_CAFES = ['caffe-nero', 'one-club-row', 'yeah-man-caribbean'];

module.exports = async function handler(req, res) {
  // Extract cafe and optional asset path from query or URL
  let cafe = req.query && req.query.cafe;
  let file = (req.query && req.query.file) || 'index.html';

  if (!cafe) {
    const urlParts = (req.url || '').split('?')[0].split('/').filter(Boolean);
    // e.g. /demo/caffe-nero or /demo/caffe-nero/styles.css
    if (urlParts[0] === 'demo' && urlParts[1]) {
      cafe = urlParts[1];
      if (urlParts[2]) {
        file = urlParts.slice(2).join('/');
      }
    }
  }

  // 1. Validate cafe exists
  if (!cafe || !ALLOWED_CAFES.includes(cafe)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    return res.end('404 Demo Not Found');
  }

  // 2. Validate session cookie
  const cookies = parseCookies(req);
  const token = cookies.demo_session;

  if (!token) {
    res.statusCode = 302;
    res.setHeader('Location', `/?error=unauthorized&cafe=${cafe}`);
    return res.end();
  }

  const verification = verifySession(token);
  if (!verification || !verification.valid) {
    if (verification && verification.expired) {
      res.statusCode = 302;
      res.setHeader('Location', `/expired.html?reason=expired&cafe=${cafe}`);
      return res.end();
    }
    res.statusCode = 302;
    res.setHeader('Location', `/?error=invalid_session`);
    return res.end();
  }

  const { payload } = verification;

  // 3. Check cross-tenant isolation (Key for Caffè Nero cannot view One Club Row)
  if (payload.cafe !== cafe) {
    res.statusCode = 302;
    res.setHeader('Location', `/?error=forbidden_cafe`);
    return res.end();
  }

  // 4. Double check database for remote admin revocation
  const keyRecord = await getKey(payload.key);
  if (!keyRecord || keyRecord.status === 'revoked') {
    res.statusCode = 302;
    res.setHeader('Location', `/expired.html?reason=revoked`);
    return res.end();
  }

  // 5. Locate requested file on disk (resilient across Vercel Lambda and local dev)
  const safeFile = path.normalize(file).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, '..', 'demos', cafe, safeFile);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'demos', cafe, safeFile);
  }

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    return res.end(`404 File Not Found: ${safeFile}`);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // 6. If HTML, inject guardian script and session metadata
  if (ext === '.html') {
    let html = fs.readFileSync(filePath, 'utf-8');

    const injection = `
<!-- DEMO IDENTITY GUARDIAN & TIMER INJECTION -->
<link rel="stylesheet" href="/gate.css" />
<script>
  window.DEMO_SESSION = {
    cafe: ${JSON.stringify(payload.cafe)},
    key: ${JSON.stringify(payload.key)},
    expiresAt: ${payload.expiresAt}
  };
</script>
<script src="/guardian.js" defer></script>
`;

    if (html.includes('</head>')) {
      html = html.replace('</head>', `${injection}\n</head>`);
    } else {
      html = injection + html;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.end(html);
  }

  // 7. For static sub-assets (CSS, JS, images)
  const stream = fs.createReadStream(filePath);
  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'public, max-age=3600');
  stream.pipe(res);
};
