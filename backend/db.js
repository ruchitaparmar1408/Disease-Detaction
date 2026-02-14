import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'disease.db');
let db = null;

function wrapStatement(nativeDb, sql) {
  return {
    run(...params) {
      const stmt = nativeDb.prepare(sql);
      if (params.length) stmt.bind(params);
      stmt.step();
      stmt.free();
      return {};
    },
    get(...params) {
      const stmt = nativeDb.prepare(sql);
      if (params.length) stmt.bind(params);
      const row = stmt.step() ? stmt.getAsObject() : null;
      stmt.free();
      return row;
    },
    all(...params) {
      const stmt = nativeDb.prepare(sql);
      if (params.length) stmt.bind(params);
      const rows = [];
      while (stmt.step()) rows.push(stmt.getAsObject());
      stmt.free();
      return rows;
    }
  };
}

function wrapDb(nativeDb) {
  return {
    _native: nativeDb,
    prepare(sql) {
      return wrapStatement(nativeDb, sql);
    },
    exec(sql) {
      nativeDb.run(sql);
    },
    export() {
      return nativeDb.export();
    },
    close() {
      nativeDb.close();
    }
  };
}

export async function initDb() {
  const SQL = await initSqlJs();
  const data = fs.existsSync(dbPath) ? new Uint8Array(fs.readFileSync(dbPath)) : null;
  const nativeDb = new SQL.Database(data);

  nativeDb.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  nativeDb.run(`
    CREATE TABLE IF NOT EXISTS diseases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      symptoms TEXT,
      causes TEXT,
      treatment TEXT,
      prevention TEXT,
      image_url TEXT,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db = wrapDb(nativeDb);
  return db;
}

export function saveDb() {
  if (!db || !db._native) return;
  const data = db._native.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

export function getDb() {
  if (!db) throw new Error('Database not initialized. Call await initDb() first.');
  return db;
}

export default new Proxy({}, {
  get(_, prop) {
    return getDb()[prop];
  }
});
