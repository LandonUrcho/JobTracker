"use server";

import db from "@/lib/db";

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const sql = `INSERT INTO user (Full_Name, User_Email, User_Password) VALUES (?, ?, ?)`;
  const info = db().prepare(sql).run(name, email, password);
  return info;
}

export async function getAllUsers() {
  const sql = `SELECT * FROM user ORDER BY Full_Name ASC`;
  const users = db().prepare(sql).all();
  return users;
}

export async function getUserById(id: number) {
  const sql = `SELECT * FROM user WHERE User_ID = ?`;
  const user = db().prepare(sql).get(id);
  return user;
}

export async function updateUser(
  id: number,
  name: string,
  email: string,
  password: string,
) {
  const sql = `UPDATE user SET Full_Name = ?, User_Email = ?, User_Password = ? WHERE User_ID = ?`;
  const info = db().prepare(sql).run(name, email, password, id);
  return info;
}

export async function deleteUser(id: number) {
  const sql = `DELETE FROM user WHERE User_ID = ?`;
  const info = db().prepare(sql).run(id);
  return info;
}

export async function createApplication(
  Job_Title: string,
  Job_Location: string,
  UserID: number,
  CompanyID: number,
) {
  const sql = `INSERT INTO application (
      Job_Title,
      Job_Location,
      Current_Status,
      Date_Applied TEXT,
      Date_Created TEXT DEFAULT CURRENT_TIMESTAMP,
      User_ID INTEGER NOT NULL,
      Company_ID INTEGER NOT NULL) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const info = db()
    .prepare(sql)
    .run(
      Job_Title,
      Job_Location,
      "In Progress",
      null,
      Date.now().toString(),
      UserID,
      CompanyID,
    );
  return info;
}

export async function createCompany(
  Company_Name: string,
  Company_Address: string,
  Is_Hiring: boolean,
  Company_Website: string,
) {
  const sql = `INSERT INTO company (Company_Name, Company_Address, Is_Hiring, Company_Website) VALUES (?, ?, ?, ?)`;
  const info = db()
    .prepare(sql)
    .run(Company_Name, Company_Address, Is_Hiring, Company_Website);
  return info;
}

export async function createContact(
  Full_Name: String,
  Company_Name: string,
  Company_ID: number,
  Job_Title?: string,
  Contact_Email?: string,
  Contact_Phone_Number?: String,
  Contact_LinkedIn_URL?: string,
  Last_Contact?: Date,
  Notes?: string,
) {
  const sql = `INSERT INTO contact (Full_Name, Company_Name, ${Job_Title || "NULL"}, ${Contact_Email || "NULL"}, ${Contact_Phone_Number || "NULL"}, ${Contact_LinkedIn_URL || "NULL"}, ${Last_Contact || "NULL"}, ${Notes || "NULL"}  , Company_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const info = db()
    .prepare(sql)
    .run(
      Full_Name,
      Company_Name,
      Job_Title,
      Contact_Email,
      Contact_Phone_Number,
      Contact_LinkedIn_URL,
      Last_Contact,
      Notes,
      Company_ID,
    );
  return info;
}
