import { describe, it, expect } from 'vitest';
import Database from 'better-sqlite3';

function createSchema(db: Database.Database, withIndex: boolean, indexType: 'none' | 'full' | 'partial') {
  db.exec(`
    CREATE TABLE user (
      User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Full_Name TEXT,
      User_Email TEXT,
      User_Password TEXT
    );
    CREATE TABLE company (
      Company_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Company_Name TEXT
    );
    CREATE TABLE application (
      Application_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Job_Title TEXT,
      Job_Location TEXT,
      Current_Status TEXT,
      Date_Created TEXT,
      User_ID INTEGER,
      Company_ID INTEGER
    );
  `);

  if (indexType === 'full') {
    db.exec(`CREATE INDEX idx_full ON application (User_ID, Current_Status);`);
  }

  if (indexType === 'partial') {
    db.exec(`
      CREATE INDEX idx_partial ON application (User_ID, Current_Status)
      WHERE Current_Status NOT IN ('rejected', 'withdrawn');
    `);
  }

  if (withIndex) {
    db.exec(`
      CREATE INDEX idx_application_user_date
      ON application (User_ID, Date_Created DESC);
    `);
  }
}

function seedData(db: Database.Database, count: number) {
  db.prepare(`INSERT INTO user (Full_Name, User_Email, User_Password) VALUES ('Test User', 'test@example.com', 'pw')`).run();
  db.prepare(`INSERT INTO company (Company_Name) VALUES ('Acme')`).run();

  const statuses = ['applied', 'interviewing', 'offered', 'rejected', 'withdrawn'];
  const insert = db.prepare(`
    INSERT INTO application (Job_Title, Job_Location, Current_Status, User_ID, Company_ID, Date_Created)
    VALUES (?, 'Remote', ?, 1, 1, ?)
  `);

  db.transaction((n: number) => {
    for (let i = 0; i < n; i++) {
      const status = statuses[i % statuses.length];
      const date = new Date(Date.now() - i * 86400000).toISOString();
      insert.run(`Job ${i}`, status, date);
    }
  })(count);
}

function measureMs(fn: () => void): number {
  const start = performance.now();
  fn();
  return performance.now() - start;
}

const ROW_COUNT = 50_000;

describe('index benchmarks', () => {

  it('dashboard query is faster with index', () => {
    const dbWithout = new Database(':memory:');
    createSchema(dbWithout, false, 'none');
    seedData(dbWithout, ROW_COUNT);

    const withoutMs = measureMs(() => {
      dbWithout.prepare(
        `SELECT * FROM application WHERE User_ID = 1 ORDER BY Date_Created DESC LIMIT 20`
      ).all();
    });

    const dbWith = new Database(':memory:');
    createSchema(dbWith, true, 'none');
    seedData(dbWith, ROW_COUNT);

    const withMs = measureMs(() => {
      dbWith.prepare(
        `SELECT * FROM application WHERE User_ID = 1 ORDER BY Date_Created DESC LIMIT 20`
      ).all();
    });

    console.log(`\nDashboard query`);
    console.log(`  Without index : ${withoutMs.toFixed(2)}ms`);
    console.log(`  With index    : ${withMs.toFixed(2)}ms`);
    console.log(`  Speedup       : ${(withoutMs / withMs).toFixed(1)}x faster`);

    expect(withMs).toBeLessThan(withoutMs);
  });

  it('partial index beats full index for active-only queries', () => {
    const dbFull = new Database(':memory:');
    createSchema(dbFull, false, 'full');
    seedData(dbFull, ROW_COUNT);

    const fullMs = measureMs(() => {
      dbFull.prepare(
        `SELECT * FROM application WHERE User_ID = 1 AND Current_Status = 'applied'`
      ).all();
    });

    const dbPartial = new Database(':memory:');
    createSchema(dbPartial, false, 'partial');
    seedData(dbPartial, ROW_COUNT);

    const partialMs = measureMs(() => {
      dbPartial.prepare(
        `SELECT * FROM application WHERE User_ID = 1 AND Current_Status = 'applied'`
      ).all();
    });

    console.log(`\nStatus filter`);
    console.log(`  Full index    : ${fullMs.toFixed(2)}ms`);
    console.log(`  Partial index : ${partialMs.toFixed(2)}ms`);
    console.log(`  Speedup       : ${(fullMs / partialMs).toFixed(1)}x faster`);

    expect(partialMs).toBeLessThan(fullMs);
  });

});