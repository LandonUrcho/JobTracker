'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              📊 Job Tracker
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              href="/dashboard"
              className={`py-2 px-1 border-b-2 border-transparent transition-colors ${isActive('/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              href="/jobs"
              className={`py-2 px-1 border-b-2 border-transparent transition-colors ${isActive('/jobs')}`}
            >
              Jobs
            </Link>
            <Link
              href="/add-job"
              className={`py-2 px-1 border-b-2 border-transparent transition-colors ${isActive('/add-job')}`}
            >
              Add Job
            </Link>
            <Link
              href="/about"
              className={`py-2 px-1 border-b-2 border-transparent transition-colors ${isActive('/about')}`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
