"use server";

import db from "@/lib/db";

type JobApplicationInput = {
  userId: number;
  companyName: string;
  jobTitle: string;
  jobLocation: string;
  status: string;
  dateApplied: string;
  companyWebsite?: string;
  companyAddress?: string;
};

type User = {
  User_ID: number;
  Full_Name: string;
  User_Email: string;
  User_Password: string;
};

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

export async function getUserByEmail(email: string) {
  const sql = `SELECT * FROM user WHERE User_Email = ?`;
  const user = db().prepare(sql).get(email) as User;
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

export async function getApplicationsByUser(userId: number) {
  const sql = `
    SELECT application.*, company.Company_Name
    FROM application
    INNER JOIN company ON application.Company_ID = company.Company_ID
    WHERE application.User_ID = ?
    ORDER BY application.Date_Created DESC
  `;
  const applications = db().prepare(sql).all(userId);
  return applications;
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
      Date_Applied,
      Date_Created,
      User_ID,
      Company_ID) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)`;
  const info = db()
    .prepare(sql)
    .run(
      Job_Title,
      Job_Location,
      "In Progress",
      null,
      UserID,
      CompanyID,
    );
  return info;
}

export async function createJobApplication({
  userId,
  companyName,
  jobTitle,
  jobLocation,
  status,
  dateApplied,
  companyWebsite,
  companyAddress,
}: JobApplicationInput) {
  const trimmedCompanyName = companyName.trim();
  const trimmedJobTitle = jobTitle.trim();
  const trimmedJobLocation = jobLocation.trim();

  if (!userId || !trimmedCompanyName || !trimmedJobTitle || !trimmedJobLocation || !status || !dateApplied) {
    throw new Error("Missing required job application fields.");
  }

  const transaction = db().transaction(() => {
    const companyInfo = db()
      .prepare(
        `INSERT INTO company (Company_Name, Company_Address, Is_Hiring, Company_Website)
         VALUES (?, ?, ?, ?)`,
      )
      .run(
        trimmedCompanyName,
        companyAddress?.trim() || null,
        1,
        companyWebsite?.trim() || null,
      );

    const applicationInfo = db()
      .prepare(
        `INSERT INTO application (
          Job_Title,
          Job_Location,
          Current_Status,
          Date_Applied,
          Date_Created,
          User_ID,
          Company_ID
        ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)`,
      )
      .run(
        trimmedJobTitle,
        trimmedJobLocation,
        status,
        dateApplied,
        userId,
        companyInfo.lastInsertRowid,
      );

    return applicationInfo;
  });

  return transaction();
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
  Full_Name: string,
  Company_Name: string,
  Company_ID: number,
  Job_Title?: string,
  Contact_Email?: string,
  Contact_Phone_Number?: string,
  Contact_LinkedIn_URL?: string,
  Last_Contact?: Date,
  Notes?: string,
) {
  const sql = `INSERT INTO contact (
    Full_Name,
    Company_Name,
    Job_Title,
    Contact_Email,
    Contact_Phone_Number,
    Contact_LinkedIn_URL,
    Last_Contact,
    Notes,
    Company_ID
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const info = db()
    .prepare(sql)
    .run(
      Full_Name,
      Company_Name,
      Job_Title || null,
      Contact_Email || null,
      Contact_Phone_Number || null,
      Contact_LinkedIn_URL || null,
      Last_Contact?.toISOString() || null,
      Notes || null,
      Company_ID,
    );
  return info;
}
