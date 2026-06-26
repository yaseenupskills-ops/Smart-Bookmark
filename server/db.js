import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'data', 'bookmarks.db');

let db = null;

export async function initDb() {
  const SQL = await initSqlJs();

  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS apps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'General',
      description TEXT DEFAULT '',
      url TEXT NOT NULL,
      keywords TEXT DEFAULT '',
      icon TEXT DEFAULT '',
      logo TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS admin_config (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      pin_hash TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS launch_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_id INTEGER NOT NULL,
      browser_id TEXT NOT NULL,
      launched_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (app_id) REFERENCES apps(id) ON DELETE CASCADE
    )
  `);

  db.run(`CREATE INDEX IF NOT EXISTS idx_launch_browser ON launch_history(browser_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_launch_app ON launch_history(app_id)`);

  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_id INTEGER NOT NULL,
      browser_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (app_id) REFERENCES apps(id) ON DELETE CASCADE,
      UNIQUE(app_id, browser_id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS category_icons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL UNIQUE,
      icon TEXT NOT NULL DEFAULT '📁'
    )
  `);

  const catCount = db.exec(`SELECT COUNT(*) as count FROM category_icons`);
  if (!catCount[0] || catCount[0].values[0][0] === 0) {
    const stmt = db.prepare(`INSERT INTO category_icons (category, icon) VALUES (?, ?)`);
    stmt.run(['Engineering', '⚙️']);
    stmt.run(['HR', '👥']);
    stmt.run(['Sales', '💼']);
    stmt.free();
    saveDb();
  }

  const adminRow = db.exec(`SELECT id FROM admin_config WHERE id = 1`);
  if (adminRow.length === 0) {
    const bcrypt = (await import('bcryptjs')).default;
    const defaultHash = bcrypt.hashSync('1234', 10);
    db.run(`INSERT INTO admin_config (id, pin_hash) VALUES (1, ?)`, [defaultHash]);
  }

  const appCount = db.exec(`SELECT COUNT(*) as count FROM apps`);
  if (!appCount[0] || appCount[0].values[0][0] === 0) {
    const stmt = db.prepare(`
      INSERT INTO apps (name, category, description, url, keywords)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(['Slack', 'Engineering', 'Collaboration Platform', 'https://slack.com', 'chat, messages, communication']);
    stmt.run(['GitHub', 'Engineering', 'Version Control', 'https://github.com', 'code, repository, git']);
    stmt.run(['Workday', 'HR', 'HR Management', 'https://workday.com', 'payroll, vacation, time off']);
    stmt.run(['Salesforce', 'Sales', 'CRM', 'https://salesforce.com', 'leads, clients, pipeline']);
    stmt.free();
    saveDb();
  }

  return db;
}

export function getDb() {
  if (!db) throw new Error('Database not initialized. Call initDb() first.');
  return db;
}

export function saveDb() {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  } catch (err) {
    console.error('Failed to save database file:', err);
  }
}
