"use client";

import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { createUser, getAllUsers } from "@/lib/commands";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const result = await getAllUsers();
      setUsers(result);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.password.trim() ||
      !formData.email.trim()
    ) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await createUser(formData.name, formData.email, formData.password);
      setFormData({ name: "", email: "", password: "" });
      setMessage("User created successfully!");
      await loadUsers();

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to create user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Job Tracker
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            This is a very generic website we need to change so much of this
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Track Applications
            </h3>
            <p className="text-gray-700">
              Keep track of every job application with company details,
              positions, and dates.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Manage Interviews
            </h3>
            <p className="text-gray-700">
              Schedule and monitor interview dates and keep detailed notes for
              each opportunity.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              View Statistics
            </h3>
            <p className="text-gray-700">
              See your job search progress at a glance with comprehensive
              dashboard metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
