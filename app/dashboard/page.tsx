"use client";

import { useEffect, useState } from "react";
import {
  getApplicationsByUser,
  getApplicationSummaryByUser,
  type ApplicationSummary,
} from "@/lib/commands";

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
  const [userName, setUserName] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [summary, setSummary] = useState<ApplicationSummary>({
    total_applications: 0,
    interviews_scheduled: 0,
    offers_received: 0,
    distinct_companies: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    const userIdNum = Number(storedUserId);

    // Fetch user's applications and aggregated summary in parallel
    Promise.all([
      getApplicationsByUser(userIdNum),
      getApplicationSummaryByUser(userIdNum),
    ]).then(([apps, stats]) => {
      setApplications(apps as Application[]);
      setSummary(stats);
      setUserName(storedUserName);
      setIsLoading(false);
    });
  }, []);

  const totalApplications = summary.total_applications;
  const interviewsScheduled = summary.interviews_scheduled;
  const offersReceived = summary.offers_received;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-500 text-lg font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          {userName && (
            <p className="text-neutral-400 mt-2 text-lg">Welcome back, {userName}!</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-900 rounded-xl shadow-md border border-neutral-800 p-6 flex flex-col justify-center">
            <div className="text-4xl font-bold text-white">
              {totalApplications}
            </div>
            <p className="text-neutral-400 font-medium mt-2">Total Applications</p>
          </div>
          
          <div className="bg-neutral-900 rounded-xl shadow-md border border-neutral-800 p-6 flex flex-col justify-center">
            <div className="text-4xl font-bold text-green-400">
              {interviewsScheduled}
            </div>
            <p className="text-neutral-400 font-medium mt-2">Interviews Scheduled</p>
          </div>
          
          <div className="bg-neutral-900 rounded-xl shadow-md border border-neutral-800 p-6 flex flex-col justify-center">
            <div className="text-4xl font-bold text-purple-400">
              {offersReceived}
            </div>
            <p className="text-neutral-400 font-medium mt-2">Offers Received</p>
          </div>
        </div>

        {/* Recent Applications Section */}
        <div className="bg-neutral-900 rounded-xl shadow-md border border-neutral-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Recent Applications
          </h2>
    
          {applications.length === 0 ? (
            <div className="text-center py-10 bg-neutral-950 rounded-lg border border-dashed border-neutral-800">
              <p className="text-neutral-500">
                No recent activity yet. Start by adding your first job application!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((app) => (
                <div
                  key={app.Application_ID}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-l-2 border-neutral-700 bg-neutral-950 rounded-r-lg p-4 transition-colors hover:bg-neutral-800"
                >
                  <div className="mb-2 sm:mb-0">
                    <p className="font-semibold text-white text-lg">{app.Job_Title}</p>
                    <p className="text-sm text-neutral-400">{app.Job_Location}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-neutral-800 border border-neutral-700 rounded-full text-neutral-300 sm:mb-1 capitalize shadow-sm">
                      {app.Current_Status}
                    </span>
                    <p className="text-xs text-neutral-500">
                      {new Date(app.Date_Created).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}