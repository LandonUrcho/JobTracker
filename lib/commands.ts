'use server'

import db from '@/lib/db';

// ==========================================
// CREATE
// ==========================================
export async function addUser(name: string, email: string, password: string) {
  const sql = `INSERT INTO user (Full_Name, User_Email, User_Password) VALUES (?, ?, ?)`;
  // .run() is used when you are modifying data (INSERT, UPDATE, DELETE)
  const info = db().prepare(sql).run(name, email, password);
  return info; // Returns an object with changes and lastInsertRowid
}

// ==========================================
// READ (All Records)
// ==========================================
export async function getAllUsers() {
  const sql = `SELECT * FROM user ORDER BY Full_Name ASC`;
  // .all() is used when you expect multiple rows back
  const users = db().prepare(sql).all();
  return users;
}

// ==========================================
// READ (Single Record)
// ==========================================
export async function getUserById(id: number) {
  const sql = `SELECT * FROM user WHERE User_ID = ?`;
  // .get() is used when you only expect a single row back
  const user = db().prepare(sql).get(id);
  return user;
}

// ==========================================
// UPDATE
// ==========================================
export async function updateUser(id: number, name: string, email: string, password: string) {
  const sql = `UPDATE user SET Full_Name = ?, User_Email = ?, User_Password = ? WHERE User_ID = ?`;
  const info = db().prepare(sql).run(name, email, password, id);
  return info;
}

// ==========================================
// DELETE
// ==========================================
export async function deleteUser(id: number) {
  const sql = `DELETE FROM user WHERE User_ID = ?`;
  const info = db().prepare(sql).run(id);
  return info;
}