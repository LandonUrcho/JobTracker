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
      <div className="flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-foreground-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground">My Jobs</h1>
        <p className="text-foreground-secondary">
          Here are the jobs you've applied to.
        </p>
      </div>
    </div>
  );
}
