/**
 * Automated Verification Harness for Private Demo Gateway
 * Tests Storage, Cryptography, 1-Hour Timer Lifecycle, Cross-Tenant Isolation,
 * Expired Key Lockout, and Admin API endpoints.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const { getKey, saveKey, listKeys, deleteKey, DEFAULT_SEEDS } = require('./lib/storage');
const { signSession, verifySession, generateIdentityKey } = require('./lib/crypto');
const verifyHandler = require('./api/auth/verify');
const sessionHandler = require('./api/auth/session');
const adminKeysHandler = require('./api/admin/keys');
const serveDemoHandler = require('./api/serve-demo');

let totalTests = 0;
let passedTests = 0;

function it(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✕ ${name}`);
    console.error(`    ${err.message}`);
  }
}

async function itAsync(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✕ ${name}`);
    console.error(`    ${err.message}`);
  }
}

// Mock HTTP Request / Response Helpers
function createMockReq(options = {}) {
  const method = options.method || 'GET';
  const url = options.url || '/';
  const headers = options.headers || {};
  const body = options.body || {};

  return {
    method,
    url,
    headers,
    query: options.query || {},
    body,
    on(event, handler) {
      if (event === 'data' && options.rawBody) {
        handler(options.rawBody);
      }
      if (event === 'end') {
        handler();
      }
    }
  };
}

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    writeHead(code, headers = {}) {
      this.statusCode = code;
      Object.assign(this.headers, headers);
    },
    setHeader(name, val) {
      this.headers[name] = val;
    },
    end(data) {
      if (data) this.body = data;
    }
  };
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING DEMO GATEWAY VERIFICATION SUITE');
  console.log('======================================================\n');

  console.log('--- Tier 1: Cryptography & Token Engine ---');

  it('Generates formatted identity keys with brand prefixes', () => {
    const k1 = generateIdentityKey('NERO');
    const k2 = generateIdentityKey('OCR');
    const k3 = generateIdentityKey('YMC');

    assert.ok(k1.startsWith('NERO-'), 'Caffè Nero key prefix match');
    assert.ok(k2.startsWith('OCR-'), 'One Club Row key prefix match');
    assert.ok(k3.startsWith('YMC-'), 'Yeah Man Caribbean key prefix match');
    assert.strictEqual(k1.split('-').length, 3, 'Key has 3 hyphen-delimited segments');
  });

  it('Signs and verifies valid HMAC-SHA256 session token', () => {
    const now = Date.now();
    const payload = {
      key: 'NERO-TEST-1234',
      cafe: 'caffe-nero',
      expiresAt: now + 3600000
    };
    const token = signSession(payload);
    assert.ok(typeof token === 'string' && token.includes('.'), 'Token format valid');

    const verified = verifySession(token);
    assert.ok(verified, 'Verification succeeded');
    assert.strictEqual(verified.valid, true, 'Token is valid');
    assert.strictEqual(verified.expired, false, 'Token is not expired');
    assert.strictEqual(verified.payload.cafe, 'caffe-nero', 'Payload cafe matches');
  });

  it('Detects tampered token and rejects signature forgery', () => {
    const token = signSession({ key: 'TEST', cafe: 'caffe-nero', expiresAt: Date.now() + 10000 });
    const parts = token.split('.');
    const tampered = parts[0] + 'x.' + parts[1];
    const result = verifySession(tampered);
    assert.strictEqual(result, null, 'Tampered token rejected');
  });

  it('Correctly flags an expired token', () => {
    const pastTime = Date.now() - 5000;
    const token = signSession({ key: 'EXPIRED-KEY', cafe: 'caffe-nero', expiresAt: pastTime });
    const verified = verifySession(token);
    assert.ok(verified, 'Token parsed');
    assert.strictEqual(verified.valid, false, 'Expired token is not valid');
    assert.strictEqual(verified.expired, true, 'Expired flag set');
  });

  console.log('\n--- Tier 2: Storage & State Persistence ---');

  await itAsync('Initializes default seeds if DB is fresh', async () => {
    const keys = await listKeys();
    assert.ok(keys.length >= 3, 'Has at least 3 default demo keys');
    const neroSeed = await getKey('NERO-DEMO-2026');
    assert.ok(neroSeed, 'NERO-DEMO-2026 seed exists');
    assert.strictEqual(neroSeed.cafe, 'caffe-nero');
    assert.strictEqual(neroSeed.status, 'pending');
  });

  await itAsync('Saves and deletes key records idempotently', async () => {
    const testKey = 'TEST-UNIT-9999';
    await saveKey({
      key: testKey,
      cafe: 'one-club-row',
      status: 'pending',
      createdAt: Date.now()
    });

    const retrieved = await getKey(testKey);
    assert.ok(retrieved, 'Retrieved saved key');
    assert.strictEqual(retrieved.key, testKey);

    await deleteKey(testKey);
    const deleted = await getKey(testKey);
    assert.strictEqual(deleted, null, 'Key successfully deleted');
  });

  console.log('\n--- Tier 3: Identity Verification & 1-Hour Timer Lifecycle ---');

  const lifecycleKey = 'NERO-LIFECYCLE-001';

  await itAsync('Activates pending key on first entry, setting exact 1-hour window', async () => {
    await saveKey({
      key: lifecycleKey,
      cafe: 'caffe-nero',
      clientName: 'Executive Pitch Lead',
      durationMinutes: 60,
      status: 'pending',
      createdAt: Date.now(),
      firstActivatedAt: null,
      expiresAt: null
    });

    const req = createMockReq({
      method: 'POST',
      body: { key: lifecycleKey }
    });
    const res = createMockRes();

    await verifyHandler(req, res);

    assert.strictEqual(res.statusCode, 200, 'Verification returns 200 OK');
    const data = JSON.parse(res.body);
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.cafe, 'caffe-nero');
    assert.strictEqual(data.redirectUrl, '/demo/caffe-nero/');
    assert.ok(data.remainingSeconds >= 3590 && data.remainingSeconds <= 3600, 'Remaining seconds is approx 3600s');

    // Verify Set-Cookie header was issued
    const cookieHeader = res.headers['Set-Cookie'];
    assert.ok(cookieHeader && cookieHeader.includes('demo_session='), 'Sets demo_session cookie');

    // Verify database record was updated
    const savedRecord = await getKey(lifecycleKey);
    assert.strictEqual(savedRecord.status, 'active', 'Status transitioned to active');
    assert.ok(savedRecord.firstActivatedAt, 'firstActivatedAt timestamp recorded');
    assert.ok(savedRecord.expiresAt, 'expiresAt timestamp calculated');
  });

  await itAsync('Re-entry of active key resumes remaining time without restarting the 1-hour timer', async () => {
    const originalRecord = await getKey(lifecycleKey);
    const originalExpiresAt = originalRecord.expiresAt;

    const req = createMockReq({
      method: 'POST',
      body: { key: lifecycleKey }
    });
    const res = createMockRes();

    await verifyHandler(req, res);
    assert.strictEqual(res.statusCode, 200);

    const data = JSON.parse(res.body);
    assert.strictEqual(data.expiresAt, originalExpiresAt, 'Expiration timestamp remains unchanged (does not reset)');
  });

  await itAsync('Expired key is locked out forever and cannot be reused', async () => {
    // Manually simulate expiration by setting expiresAt in the past
    const record = await getKey(lifecycleKey);
    record.expiresAt = Date.now() - 10000;
    record.status = 'expired';
    await saveKey(record);

    const req = createMockReq({
      method: 'POST',
      body: { key: lifecycleKey }
    });
    const res = createMockRes();

    await verifyHandler(req, res);
    assert.strictEqual(res.statusCode, 403, 'Expired key returns 403 Forbidden');
    const data = JSON.parse(res.body);
    assert.strictEqual(data.expired, true, 'Expired flag is true');
    assert.ok(data.error.includes('expired'), 'Error message informs user key is expired');
  });

  console.log('\n--- Tier 4: Gatekeeper & Cross-Tenant Security ---');

  await itAsync('Unauthenticated request to /demo/caffe-nero is redirected to portal', async () => {
    const req = createMockReq({
      url: '/demo/caffe-nero',
      query: { cafe: 'caffe-nero' }
    });
    const res = createMockRes();

    await serveDemoHandler(req, res);
    assert.strictEqual(res.statusCode, 302, 'Redirects unauthenticated visitor');
    assert.ok(res.headers.Location.includes('/?error=unauthorized'), 'Redirect location contains error');
  });

  await itAsync('Cross-tenant violation: Caffè Nero token cannot access One Club Row', async () => {
    const neroToken = signSession({
      key: 'NERO-KEY',
      cafe: 'caffe-nero',
      expiresAt: Date.now() + 3600000
    });

    const req = createMockReq({
      url: '/demo/one-club-row',
      query: { cafe: 'one-club-row' },
      headers: { cookie: `demo_session=${neroToken}` }
    });
    const res = createMockRes();

    await serveDemoHandler(req, res);
    assert.strictEqual(res.statusCode, 302, 'Cross-tenant access blocked');
    assert.ok(res.headers.Location.includes('forbidden_cafe'), 'Redirects with forbidden_cafe error');
  });

  await itAsync('Valid session serves demo HTML with injected guardian and security headers', async () => {
    // Re-activate a key
    const validKey = 'OCR-ACTIVE-TEST';
    await saveKey({
      key: validKey,
      cafe: 'one-club-row',
      status: 'active',
      durationMinutes: 60,
      firstActivatedAt: Date.now(),
      expiresAt: Date.now() + 3600000
    });

    const token = signSession({
      key: validKey,
      cafe: 'one-club-row',
      expiresAt: Date.now() + 3600000
    });

    const req = createMockReq({
      url: '/demo/one-club-row',
      query: { cafe: 'one-club-row' },
      headers: { cookie: `demo_session=${token}` }
    });
    const res = createMockRes();

    await serveDemoHandler(req, res);
    assert.strictEqual(res.statusCode, 200, 'Demo served successfully');
    assert.ok(res.body.includes('One Club Row'), 'Demo HTML contains brand name');
    assert.ok(res.body.includes('/guardian.js'), 'Injected guardian script present');
    assert.ok(res.body.includes('window.DEMO_SESSION'), 'Injected session metadata present');
    assert.strictEqual(res.headers['Cache-Control'], 'no-store, no-cache, must-revalidate', 'Prevents browser caching');
  });

  console.log('\n--- Tier 5: Admin API & Session Management ---');

  await itAsync('Rejects unauthorized admin requests without password', async () => {
    const req = createMockReq({
      url: '/api/admin/keys',
      method: 'GET'
    });
    const res = createMockRes();

    await adminKeysHandler(req, res);
    assert.strictEqual(res.statusCode, 401, 'Unauthorized request rejected');
  });

  await itAsync('Admin can generate new key and extend active session', async () => {
    const adminReq = createMockReq({
      url: '/api/admin/keys',
      method: 'POST',
      headers: { authorization: 'Bearer shashwat2908' },
      body: {
        action: 'generate',
        cafe: 'yeah-man-caribbean',
        clientName: 'Jamie Caribbean Lead',
        durationMinutes: 60
      }
    });
    const adminRes = createMockRes();

    await adminKeysHandler(adminReq, adminRes);
    assert.strictEqual(adminRes.statusCode, 201, 'Key created');
    const createdData = JSON.parse(adminRes.body);
    const newKey = createdData.key.key;
    assert.ok(newKey.startsWith('YMC-'), 'Prefix is YMC');

    // Extend session by 30 minutes
    const extendReq = createMockReq({
      url: '/api/admin/keys',
      method: 'POST',
      headers: { authorization: 'Bearer shashwat2908' },
      body: {
        action: 'extend',
        key: newKey,
        additionalMinutes: 30
      }
    });
    const extendRes = createMockRes();
    await adminKeysHandler(extendReq, extendRes);
    assert.strictEqual(extendRes.statusCode, 200, 'Key extended');

    // Revoke key
    const revokeReq = createMockReq({
      url: '/api/admin/keys',
      method: 'POST',
      headers: { authorization: 'Bearer shashwat2908' },
      body: {
        action: 'revoke',
        key: newKey
      }
    });
    const revokeRes = createMockRes();
    await adminKeysHandler(revokeReq, revokeRes);
    assert.strictEqual(revokeRes.statusCode, 200, 'Key revoked');

    const updatedRecord = await getKey(newKey);
    assert.strictEqual(updatedRecord.status, 'revoked', 'Status is revoked');
  });

  console.log('\n======================================================');
  console.log(`SUMMARY: ${passedTests}/${totalTests} tests passed (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log('======================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
