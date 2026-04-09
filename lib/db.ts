import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db: Database.Database;

/**
 * Initialize and get database connection
 */
export function getDatabase(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'data', 'jobtracker.db');
    
    // Ensure data directory exists
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new Database(dbPath);
    db.pragma('foreign_keys = ON');
    db.pragma('journal_mode = WAL');
  }
  
  return db;
}

/**
 * Close database connection
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
  }
}

/**
 * Initialize database schema
 */
export function initializeDatabase(): void {
  const database = getDatabase();
  
  // Create tables if they don't exist
  database.exec(`
    CREATE TABLE IF NOT EXISTS user (
      User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Full_Name TEXT NOT NULL,
      User_Email TEXT NOT NULL,
      User_Phone_Number TEXT,
      User_Password TEXT NOT NULL,
      Major TEXT,
      Graduation_Year INTEGER
    );

    CREATE TABLE IF NOT EXISTS application (
      Application_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Job_Title TEXT NOT NULL,
      Job_Location TEXT NOT NULL,
      Current_Status TEXT NOT NULL DEFAULT 'applied',
      Date_Applied TEXT,
      Date_Created TEXT DEFAULT CURRENT_TIMESTAMP,
      User_ID INTEGER NOT NULL,
      Company_ID INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS company (
      Company_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Company_Name TEXT NOT NULL,
      Company_Address TEXT,
      Is_Hiring BOOLEAN,
      Company_Website TEXT
    );

    CREATE TABLE IF NOT EXISTS contact (
      Full_Name TEXT NOT NULL,
      Company_Name TEXT NOT NULL,
      Job_Title TEXT,
      Contact_Email TEXT,
      Contact_Phone_Number TEXT,
      Contact_LinkedIn_URL TEXT,
      Last_Contact DATE,
      Notes TEXT,
      Company_ID INTEGER NOT NULL
    );
  `);
}

/**
 * Run a prepared statement
 */
export function runQuery<T = any>(
  sql: string,
  params: any[] = []
): T {
  const database = getDatabase();
  const stmt = database.prepare(sql);
  return stmt.run(...params) as T;
}

/**
 * Get a single row
 */
export function getOne<T = any>(
  sql: string,
  params: any[] = []
): T | undefined {
  const database = getDatabase();
  const stmt = database.prepare(sql);
  return stmt.get(...params) as T | undefined;
}

/**
 * Get all rows
 */
export function getAll<T = any>(
  sql: string,
  params: any[] = []
): T[] {
  const database = getDatabase();
  const stmt = database.prepare(sql);
  return stmt.all(...params) as T[];
}

/**
 * Execute multiple statements in a transaction
 */
export function transaction<T>(
  callback: (db: Database.Database) => T
): T {
  const database = getDatabase();
  const tx = database.transaction(callback);
  return tx(database);
}

export default getDatabase;
