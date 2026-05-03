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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    jobTitle: "",
    jobLocation: "",
    status: "",
    dateApplied: "",
  });

  useEffect(() => {
    
    // get userId from localStorage, if none redirect to Login page
    
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login");
      return;
    }

    // check for valid UserID, if none redirct to Login page

    const userIdNum = Number(storedUserId);
    if (!userIdNum) {
      router.push("/login");
      return;
    }



    // call API to get applications for userId

    fetch(`/api/jobs?userId=${userIdNum}`)
      .then(async (res) => {
        const data = await res.json();

        // if response is not ok, throw error with message from response or default message

        if (!res.ok) {
          throw new Error(data?.error || "Unable to load job applications.");
        }
        return data;
      })

      // set applications from api response, if none set to empty array

      .then((data) => {
        setApplications(data.applications ?? []);
      })
      // if errror occurs, set error message from error
      .catch((err) => {
        setError(err.message || "Unable to load job applications.");
      })
      // finally set loading to false
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);


  // deletes application by calling API with applicationId

  const handleDelete = async (applicationId: number) => {
    
    // confirm users wants to delete

    if (!confirm("Are you sure you want to delete this application?")) return;

    // call API to delete application, if successful remove

    try {
      const res = await fetch(`/api/jobs?applicationId=${applicationId}`, {
        method: "DELETE",
      });

      //  if is response i not valid throw error message

      if (!res.ok) {
        throw new Error("Failed to delete application.");
      }
      setApplications(applications.filter(app => app.Application_ID !== applicationId));
    } catch (err) {
      setError("Failed to delete application.");
    }
  };
  
  // enables to the selected application to be edited 

  const handleEdit = (app: Application) => {
    setEditingId(app.Application_ID);
    setEditForm({
      jobTitle: app.Job_Title,
      jobLocation: app.Job_Location,
      status: app.Current_Status,
      dateApplied: app.Date_Applied || "",
    });
  };

  // saves the edited application 

  const handleSave = async () => {
    if (!editingId) return;
      
    // call api to update the application

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

      // if response is not valid throw error message

      if (!res.ok) {
        throw new Error("Failed to update application.");
      }
      setApplications(applications.map(app =>
        app.Application_ID === editingId
          ? { ...app, Job_Title: editForm.jobTitle, Job_Location: editForm.jobLocation, Current_Status: editForm.status, Date_Applied: editForm.dateApplied }
          : app
      ));
      setEditingId(null);
    } catch (err) {
      setError("Failed to update application.");
    }
  };

  // cancels edits mode and resets the application 

  const handleCancel = () => {
    setEditingId(null);
  };

  // if loading show loading message
  
  if (isLoading) {
    return (
      <div className="flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-foreground-secondary">Loading job applications...</p>
        </div>
      </div>
    );
  }

  // if error show the error message

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

  // if no applications show message prompting user to add applications, otherwise show table of applications

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
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.Application_ID}
                    className="border-b border-border hover:bg-background-tertiary transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground">
                      {editingId === app.Application_ID ? (
                        <input
                          type="text"
                          value={editForm.jobTitle}
                          onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        app.Job_Title
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">
                      {editingId === app.Application_ID ? (
                        <input
                          type="text"
                          value={editForm.jobLocation}
                          onChange={(e) => setEditForm({ ...editForm, jobLocation: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        app.Job_Location
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === app.Application_ID ? (
                        <select
                          value={editForm.status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="w-full px-2 py-1 border rounded bg-white text-black"
                        >
                          <option value="In Progress">In Progress</option>
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300">{app.Current_Status}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">
                      {editingId === app.Application_ID ? (
                        <input
                          type="date"
                          value={editForm.dateApplied}
                          onChange={(e) => setEditForm({ ...editForm, dateApplied: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        app.Date_Applied ? new Date(app.Date_Applied).toLocaleDateString() : "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === app.Application_ID ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-green-500 text-white rounded text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(app)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(app.Application_ID)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs"
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
