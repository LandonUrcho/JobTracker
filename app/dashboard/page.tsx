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

export default function Dashboard() {
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    if (!storedUserId) {
      window.location.href = "/login";
      return;
    }

    const userIdNum = Number(storedUserId);
    setUserId(userIdNum);
    setUserName(storedUserName);

    // Fetch user's applications
    getApplicationsByUser(userIdNum).then((apps) => {
      setApplications(apps as Application[]);
      setIsLoading(false);
    });
  }, []);

  const totalApplications = applications.length;
  const interviewsScheduled = applications.filter(
    (app) => app.Current_Status === "interview",
  ).length;
  const offersReceived = applications.filter(
    (app) => app.Current_Status === "offer",
  ).length;

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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        {userName && (
          <p className="text-gray-600 mb-8">Welcome back, {userName}!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600">
              {totalApplications}
            </div>
            <p className="text-gray-600 mt-2">Total Applications</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">
              {interviewsScheduled}
            </div>
            <p className="text-gray-600 mt-2">Interviews Scheduled</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600">
              {offersReceived}
            </div>
            <p className="text-gray-600 mt-2">Offers Received</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Recent Applications
          </h2>
          {applications.length === 0 ? (
            <p className="text-gray-600">
              No recent activity yet. Start by adding your first job
              application!
            </p>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((app) => (
                <div
                  key={app.Application_ID}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <p className="font-semibold text-gray-900">{app.Job_Title}</p>
                  <p className="text-sm text-gray-600">{app.Job_Location}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(app.Date_Created).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
