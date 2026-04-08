import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Job Tracker
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Stay organized and never miss an opportunity. Track all your job applications, 
            interview schedules, and opportunities in one centralized place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/add-job"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Add First Job
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Track Applications</h3>
            <p className="text-gray-700">
              Keep track of every job application with company details, positions, and dates.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Manage Interviews</h3>
            <p className="text-gray-700">
              Schedule and monitor interview dates and keep detailed notes for each opportunity.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">View Statistics</h3>
            <p className="text-gray-700">
              See your job search progress at a glance with comprehensive dashboard metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
