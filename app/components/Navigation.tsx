"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const userID = (localStorage.getItem("userId") || null);
  const isActive = (path: string) => {
    return pathname === path
      ? "text-accent border-b-2 border-accent"
      : "text-foreground-secondary hover:text-foreground hover:border-b-2 hover:border-accent/50";
  };

  return (
    <nav className="border-b bg-background-secondary border-border">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-accent">
              Job Tracker
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/dashboard"
              className={`py-2 px-3 transition-all duration-100 ${isActive("/dashboard")}`}
            >
              Dashboard
            </Link>
            <span>|</span>
            <Link
              href="/jobs"
              className={`py-2 px-3 transition-all duration-100 ${isActive("/jobs")}`}
            >
              Jobs
            </Link>
            <span>|</span>
            <Link
              href="/add-job"
              className={`py-2 px-3 transition-all duration-100 ${isActive("/add-job")}`}
            >
              Add Job
            </Link>
            <span>|</span>
            {userID ? (
              <Link
                href="/"
                className={`py-2 px-3 transition-all duration-100 ${isActive("/logout")}`}
                onClick={() => localStorage.clear()}
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/login"
                className={`py-2 px-3 transition-all duration-100 ${isActive("/login")}`}
              >
                Login
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
}
