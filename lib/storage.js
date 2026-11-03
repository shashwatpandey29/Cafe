/**
 * Storage Layer for Identity Key Gateway
 * Supports Upstash Redis REST API (Production on Vercel)
 * with automatic fallback to local JSON file (data/keys.json) for dev/testing.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
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

// Helper for local file persistence
function ensureLocalDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    const initial = {};
    for (const seed of DEFAULT_SEEDS) {
      initial[seed.key.toUpperCase()] = seed;
    }
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveLocalDb(data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
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
      if (!res) return null;
      return typeof res === 'string' ? JSON.parse(res) : res;
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
      if (!Array.isArray(keyIds) || keyIds.length === 0) {
        // First run seed in Upstash if empty
        for (const seed of DEFAULT_SEEDS) {
          await saveKey(seed);
        }
        return DEFAULT_SEEDS;
      }
      const records = [];
      for (const k of keyIds) {
        const item = await getKey(k);
        if (item) records.push(item);
      }
      return records;
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
