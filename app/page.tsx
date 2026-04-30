import Link from 'next/link';
import Image from 'next/image';

export default function Home() {

  return (
    <div className="flex-1 bg-[url('/background.png')] bg-cover bg-center flex items-center">
      <div className="flex flex-col justify-center items-start h-full w-[40%] pr-8">
        <div className="text-8xl font-bold text-white m-4">
          Welcome to Job Tracker
        </div>
        <div className="text-3xl m-4">
          Organize and maintain all of your job applications in one centralized location. Track your progress, set reminders, and stay on top of your job search with ease.
        </div>

        <Link
          href="/login"
          className="text-2xl font-semibold text-neutral-800 hover:text-white hover:scale-101 m-2 px-6 transition-colors"
        >
          Get Started &gt;
        </Link>
      </div>

      <div className="flex flex-col gap-4 w-[35%] h-full justify-center pr-8 ml-auto">
        <div className="bg-background-secondary/80 rounded-lg border border-border p-6 backdrop-blur-sm hover:bg-background-secondary/90 transition-colors flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">Track Applications</h3>
            <p className="text-foreground-secondary text-sm">
              Keep detailed records of every job application including company info, position details, salary expectations, and application dates all in one place.
            </p>
          </div>
          <div className="w-24 h-24 flex-shrink-0 relative">
            <Image src="/application.jpg" alt="Track Applications" fill className="object-cover rounded" />
          </div>
        </div>

        {/* Create User Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Create New User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user name"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-Mail
              </label>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user email"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                password
              </label>
              <input
                id="password  "
                type="text"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user password"
                disabled={loading}
              />
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.includes("success")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </form>
        </div>

        {/* Users List Section */}
        {users.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Users</h2>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.User_ID} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900">
                    {user.Full_Name}
                  </div>
                  <div className="text-sm text-gray-600">{user.User_Email}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-background-secondary/80 rounded-lg border border-border p-6 backdrop-blur-sm hover:bg-background-secondary/90 transition-colors flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">Schedule Interviews</h3>
            <p className="text-foreground-secondary text-sm">
              Manage interview dates, times, and locations. Add notes, prepare talking points, and receive reminders to stay organized throughout your job search.
            </p>
          </div>
          <div className="w-24 h-24 flex-shrink-0 relative">
            <Image src="/interview.jpg" alt="Schedule Interviews" fill className="object-cover rounded" />
          </div>
        </div>

        <div className="bg-background-secondary/80 rounded-lg border border-border p-6 backdrop-blur-sm hover:bg-background-secondary/90 transition-colors flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">Analytics & Insights</h3>
            <p className="text-foreground-secondary text-sm">
              Visualize your job search progress with comprehensive statistics. Track success rates, identify trends, and optimize your application strategy.
            </p>
          </div>
          <div className="w-24 h-24 flex-shrink-0 relative">
            <Image src="/analytics.jpg" alt="Analytics & Insights" fill className="object-cover rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
