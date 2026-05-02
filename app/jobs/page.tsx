"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Application = {
  Application_ID: number;
  Job_Title: string;
  Job_Location: string;
  Current_Status: string;
  Date_Applied: string | null;
  Date_Created: string;
  User_ID: number;
  Company_ID: number;
};

export default function Jobs() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login");
      return;
    }

    const userIdNum = Number(storedUserId);
    if (!userIdNum) {
      router.push("/login");
      return;
    }

    fetch(`/api/jobs?userId=${userIdNum}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Unable to load job applications.");
        }
        return data;
      })
      .then((data) => {
        setApplications(data.applications ?? []);
      })
      .catch((err) => {
        setError(err.message || "Unable to load job applications.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-foreground-secondary">Loading job applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-background-secondary rounded-lg shadow border border-border p-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">Unable to load jobs</h1>
            <p className="text-foreground-secondary">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Your Job Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-background-secondary rounded-lg shadow border border-border overflow-hidden">
            <div className="px-6 py-8 text-center">
              <p className="text-foreground-secondary text-lg">No job applications yet.</p>
              <p className="text-foreground-tertiary">Start tracking your job search by adding your first application.</p>
            </div>
          </div>
        ) : (
          <div className="bg-background-secondary rounded-lg shadow border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-background-tertiary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Date Applied
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.Application_ID}
                    className="border-b border-border hover:bg-background-tertiary transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground">{app.Job_Title}</td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">{app.Job_Location}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300">{app.Current_Status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">
                      {app.Date_Applied ? new Date(app.Date_Applied).toLocaleDateString() : "N/A"}
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
