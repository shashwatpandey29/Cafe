/**
 * Storage Layer for Identity Key Gateway
 * Supports Upstash Redis REST API (Production on Vercel)
 * with automatic fallback to writable temp / local JSON file (keys.json) for dev/testing.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isServerless ? os.tmpdir() : path.join(__dirname, '..', 'data');
const LOCAL_DB_PATH = path.join(DATA_DIR, 'keys.json');

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Initial starter seeds for immediate testing out of the box
const DEFAULT_SEEDS = [
  {
    key: 'NERO-DEMO-2026',
    cafe: 'caffe-nero',
    clientName: 'Caffè Nero Executive Team',
    durationMinutes: 60,
    status: 'pending',
    createdAt: Date.now(),
    firstActivatedAt: null,
    expiresAt: null,
    revokedAt: null
  },
  {
    key: 'OCR-DEMO-2026',
    cafe: 'one-club-row',
    clientName: 'One Club Row Management',
    durationMinutes: 60,
    status: 'pending',
    createdAt: Date.now(),
    firstActivatedAt: null,
    expiresAt: null,
    revokedAt: null
  },
  {
    key: 'YMC-DEMO-2026',
    cafe: 'yeah-man-caribbean',
    clientName: 'Yeah Man Caribbean Kitchen & Grill',
    durationMinutes: 60,
    status: 'pending',
    createdAt: Date.now(),
    firstActivatedAt: null,
    expiresAt: null,
    revokedAt: null
  }
];

// In-memory cache & fallback to guarantee zero 500 errors on serverless
let MEMORY_DB = null;

function ensureLocalDb() {
  if (MEMORY_DB) return MEMORY_DB;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      const initial = {};
      for (const seed of DEFAULT_SEEDS) {
        initial[seed.key.toUpperCase()] = seed;
      }
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      MEMORY_DB = initial;
      return initial;
    }
    const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    MEMORY_DB = JSON.parse(raw);
    return MEMORY_DB;
  } catch (e) {
    console.warn('[Storage] Local filesystem fallback to memory:', e.message);
    if (!MEMORY_DB) {
      MEMORY_DB = {};
      for (const seed of DEFAULT_SEEDS) {
        MEMORY_DB[seed.key.toUpperCase()] = seed;
      }
    }
    return MEMORY_DB;
  }
}

function saveLocalDb(data) {
  MEMORY_DB = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('[Storage] Filesystem write error, stored in-memory only:', e.message);
  }
}

// Upstash Redis execution helper
async function upstashCommand(commandArray) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    throw new Error('Upstash Redis credentials not configured.');
  }
  const cleanUrl = UPSTASH_URL.replace(/\/+$/, '');
  const response = await fetch(cleanUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commandArray)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upstash error (${response.status}): ${text}`);
  }
  const json = await response.json();
  return json.result;
}

/**
 * Retrieve a key record by key string (case-insensitive)
 */
async function getKey(rawKey) {
  if (!rawKey) return null;
  const keyId = String(rawKey).trim().toUpperCase();

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const res = await upstashCommand(['GET', `key:${keyId}`]);
      if (res) {
        return typeof res === 'string' ? JSON.parse(res) : res;
      }
    } catch (err) {
      console.error('[Storage] Upstash getKey failed, falling back to local DB:', err.message);
    }
  }

  const db = ensureLocalDb();
  return db[keyId] || null;
}

/**
 * Save or update a key record
 */
async function saveKey(keyRecord) {
  if (!keyRecord || !keyRecord.key) {
    throw new Error('Invalid key record: missing key property.');
  }
  const keyId = String(keyRecord.key).trim().toUpperCase();
  const normalized = {
    ...keyRecord,
    key: keyId
  };

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      await upstashCommand(['SET', `key:${keyId}`, JSON.stringify(normalized)]);
      await upstashCommand(['SADD', 'registry:keys', keyId]);
      return normalized;
    } catch (err) {
      console.error('[Storage] Upstash saveKey failed, falling back to local DB:', err.message);
    }
  }

  const db = ensureLocalDb();
  db[keyId] = normalized;
  saveLocalDb(db);
  return normalized;
}

/**
 * List all registered keys
 */
async function listKeys() {
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const keyIds = await upstashCommand(['SMEMBERS', 'registry:keys']);
      if (Array.isArray(keyIds) && keyIds.length > 0) {
        const records = [];
        for (const k of keyIds) {
          const item = await getKey(k);
          if (item) records.push(item);
        }
        return records;
      }
    } catch (err) {
      console.error('[Storage] Upstash listKeys failed, falling back to local DB:', err.message);
    }
  }

  const db = ensureLocalDb();
  return Object.values(db);
}

/**
 * Delete a key record
 */
async function deleteKey(rawKey) {
  if (!rawKey) return false;
  const keyId = String(rawKey).trim().toUpperCase();

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      await upstashCommand(['DEL', `key:${keyId}`]);
      await upstashCommand(['SREM', 'registry:keys', keyId]);
      return true;
    } catch (err) {
      console.error('[Storage] Upstash deleteKey failed, falling back to local DB:', err.message);
    }
  }

  const db = ensureLocalDb();
  if (db[keyId]) {
    delete db[keyId];
    saveLocalDb(db);
    return true;
  }
  return false;
}

module.exports = {
  getKey,
  saveKey,
  listKeys,
  deleteKey,
  DEFAULT_SEEDS
};
