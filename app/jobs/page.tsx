"use client";

import { useEffect, useState, useCallback } from "react";
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
  Company_Name: string;
  Company_Website: string | null;
  Is_Hiring: number | null;
};

const ALL_STATUSES = ["All", "In Progress", "Applied", "Interview", "Offer", "Rejected"];

// Returns Tailwind-compatible inline style colours for each status badge
function statusStyle(status: string): { background: string; color: string } {
  switch (status) {
    case "Offer":
      return { background: "rgba(16,185,129,0.18)", color: "#34d399" };
    case "Interview":
      return { background: "rgba(99,102,241,0.18)", color: "#a5b4fc" };
    case "Applied":
      return { background: "rgba(14,165,233,0.18)", color: "#38bdf8" };
    case "Rejected":
      return { background: "rgba(239,68,68,0.18)", color: "#f87171" };
    case "In Progress":
    default:
      return { background: "rgba(217,70,239,0.18)", color: "#f0abfc" };
  }
}

export default function Jobs() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    jobTitle: "",
    jobLocation: "",
    status: "",
    dateApplied: "",
  });

  // Fetch applications; re-runs whenever the active status filter changes
  const fetchApplications = useCallback(
    (userId: number, filter: string) => {
      setIsLoading(true);
      const url =
        filter === "All"
          ? `/api/jobs?userId=${userId}`
          : `/api/jobs?userId=${userId}&status=${encodeURIComponent(filter)}`;

      fetch(url)
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
    },
    [],
  );

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
    fetchApplications(userIdNum, activeFilter);
  }, [router, activeFilter, fetchApplications]);

  // Change filter — triggers re-fetch via the useEffect above
  const handleFilterChange = (status: string) => {
    setEditingId(null);
    setActiveFilter(status);
  };

  const handleDelete = async (applicationId: number) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await fetch(`/api/jobs?applicationId=${applicationId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete application.");
      setApplications(applications.filter((app) => app.Application_ID !== applicationId));
    } catch {
      setError("Failed to delete application.");
    }
  };

  const handleEdit = (app: Application) => {
    setEditingId(app.Application_ID);
    setEditForm({
      jobTitle: app.Job_Title,
      jobLocation: app.Job_Location,
      status: app.Current_Status,
      dateApplied: app.Date_Applied || "",
    });
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      const res = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: editingId,
          jobTitle: editForm.jobTitle,
          jobLocation: editForm.jobLocation,
          status: editForm.status,
          dateApplied: editForm.dateApplied || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to update application.");
      setApplications(
        applications.map((app) =>
          app.Application_ID === editingId
            ? {
                ...app,
                Job_Title: editForm.jobTitle,
                Job_Location: editForm.jobLocation,
                Current_Status: editForm.status,
                Date_Applied: editForm.dateApplied,
              }
            : app,
        ),
      );
      setEditingId(null);
    } catch {
      setError("Failed to update application.");
    }
  };

  const handleCancel = () => setEditingId(null);

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
        <h1 className="text-4xl font-bold text-foreground mb-2">Your Job Applications</h1>
        <p className="text-foreground-tertiary mb-8">
          {activeFilter === "All"
            ? `${applications.length} application${applications.length !== 1 ? "s" : ""} total`
            : `${applications.length} application${applications.length !== 1 ? "s" : ""} with status "${activeFilter}"`}
        </p>

        {/* ── Status Filter Bar ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ALL_STATUSES.map((status) => {
            const isActive = activeFilter === status;
            const style = status === "All" ? null : statusStyle(status);
            return (
              <button
                key={status}
                onClick={() => handleFilterChange(status)}
                style={
                  isActive && style
                    ? { background: style.background, color: style.color, borderColor: style.color }
                    : isActive && !style
                    ? { background: "rgba(99,102,241,0.18)", color: "#a5b4fc", borderColor: "#6366f1" }
                    : {}
                }
                className={[
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
                  isActive
                    ? "shadow-sm"
                    : "border-border text-foreground-tertiary hover:border-primary-500 hover:text-foreground",
                ].join(" ")}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* ── Table or Empty State ── */}
        {isLoading ? (
          <div className="bg-background-secondary rounded-lg shadow border border-border p-8">
            <p className="text-foreground-secondary animate-pulse">Loading applications…</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-background-secondary rounded-lg shadow border border-border overflow-hidden">
            <div className="px-6 py-12 text-center">
              <p className="text-foreground-secondary text-lg mb-1">
                {activeFilter === "All"
                  ? "No job applications yet."
                  : `No applications with status "${activeFilter}".`}
              </p>
              <p className="text-foreground-tertiary text-sm">
                {activeFilter === "All"
                  ? "Start tracking your job search by adding your first application."
                  : "Try a different filter or add a new application."}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-background-secondary rounded-lg shadow border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-background-tertiary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Job Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date Applied</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.Application_ID}
                    className="border-b border-border hover:bg-background-tertiary transition-colors"
                  >
                    {/* Job Title */}
                    <td className="px-6 py-4 text-sm text-foreground">
                      {editingId === app.Application_ID ? (
                        <input
                          type="text"
                          value={editForm.jobTitle}
                          onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-background border border-border text-foreground"
                        />
                      ) : (
                        app.Job_Title
                      )}
                    </td>

                    {/* Company — joined from company table */}
                    <td className="px-6 py-4 text-sm text-foreground-secondary">
                      {app.Company_Website ? (
                        <a
                          href={app.Company_Website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-300 underline underline-offset-2 transition-colors"
                        >
                          {app.Company_Name}
                        </a>
                      ) : (
                        app.Company_Name
                      )}
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-sm text-foreground-secondary">
                      {editingId === app.Application_ID ? (
                        <input
                          type="text"
                          value={editForm.jobLocation}
                          onChange={(e) => setEditForm({ ...editForm, jobLocation: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-background border border-border text-foreground"
                        />
                      ) : (
                        app.Job_Location
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-sm">
                      {editingId === app.Application_ID ? (
                        <select
                          value={editForm.status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-background border border-border text-foreground"
                        >
                          {ALL_STATUSES.filter((s) => s !== "All").map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={statusStyle(app.Current_Status)}
                        >
                          {app.Current_Status}
                        </span>
                      )}
                    </td>

                    {/* Date Applied */}
                    <td className="px-6 py-4 text-sm text-foreground-secondary">
                      {editingId === app.Application_ID ? (
                        <input
                          type="date"
                          value={editForm.dateApplied}
                          onChange={(e) => setEditForm({ ...editForm, dateApplied: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-background border border-border text-foreground"
                        />
                      ) : app.Date_Applied ? (
                        new Date(app.Date_Applied).toLocaleDateString()
                      ) : (
                        "N/A"
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-sm">
                      {editingId === app.Application_ID ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="px-3 py-1 rounded text-xs font-medium"
                            style={{ background: "rgba(16,185,129,0.18)", color: "#34d399" }}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-3 py-1 rounded text-xs font-medium border border-border text-foreground-tertiary hover:text-foreground transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(app)}
                            className="px-3 py-1 rounded text-xs font-medium"
                            style={{ background: "rgba(99,102,241,0.18)", color: "#a5b4fc" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(app.Application_ID)}
                            className="px-3 py-1 rounded text-xs font-medium"
                            style={{ background: "rgba(239,68,68,0.18)", color: "#f87171" }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
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
