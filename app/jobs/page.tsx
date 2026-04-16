"use client";

import { useEffect, useState } from "react";
import { getApplicationsByUser } from "@/lib/commands";

type Application = {
  Application_ID: number;
  Job_Title: string;
  Job_Location: string;
  Current_Status: string;
  Date_Applied: string;
  Date_Created: string;
  User_ID: number;
  Company_ID: number;
};

export default function Jobs() {
  const [userId, setUserId] = useState<number | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      window.location.href = "/login";
      return;
    }

    const userIdNum = Number(storedUserId);
    setUserId(userIdNum);

    // Fetch user's applications
    getApplicationsByUser(userIdNum).then((apps) => {
      setApplications(apps as Application[]);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Your Job Applications
          </h1>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-8 text-center">
              <p className="text-gray-600 text-lg">No job applications yet.</p>
              <p className="text-gray-500">
                Start tracking your job search by adding your first application.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Date Applied
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.Application_ID}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {app.Job_Title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.Job_Location}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {app.Current_Status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.Date_Applied
                        ? new Date(app.Date_Applied).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
