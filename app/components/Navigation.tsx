"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "border-b-2 border-blue-600 text-blue-600"
      : "text-gray-600 hover:text-gray-900";
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
          <div className="flex items-center space-x-8 ">
            <Link
              href="/dashboard"
              className={`text-white py-2 px-1 border-b-2 border-transparent transition-colors ${isActive("/dashboard")}`}
            >
              Dashboard
            </Link>
            <span>|
            </span>
            <Link
              href="/jobs"
              className={`text-white py-2 px-1 border-b-2 border-transparent transition-colors ${isActive("/jobs")}`}
            >
              Jobs
            </Link>
            <span>|
            </span>
            <Link
              href="/add-job"
              className={`text-white py-2 px-1 border-b-2 border-transparent transition-colors ${isActive("/add-job")}`}
            >
              Add Job
            </Link>
            <span>|
            </span>
            <Link
              href="/about"
              className={`text-white py-2 px-1 border-b-2 border-transparent transition-colors ${isActive("/about")}`}
            >
              About
            </Link>
            <span>|
            </span>
            <Link
              href="/login"
              className={`text-white py-2 px-1 border-b-2 border-transparent transition-colors ${isActive("/login")}`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
