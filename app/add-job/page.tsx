'use client';

import { FormEvent } from 'react';

export default function AddJob() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle form submission
    alert('Job added! (Feature coming soon)');
  };

  return (
    <div className="flex-1 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Add New Job Application</h1>

        <form onSubmit={handleSubmit} className="bg-background-secondary rounded-lg shadow border border-border p-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-foreground-secondary mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Acme Corporation"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-foreground-secondary mb-2">
                Job Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                required
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Senior Engineer"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground-secondary mb-2">
                Application Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-foreground-secondary mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option>Applied</option>
                <option>Under Review</option>
                <option>Interview Scheduled</option>
                <option>Rejected</option>
                <option>Offer Received</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-foreground-secondary mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Add any notes about the position or company..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-background font-semibold py-2 rounded-lg hover:bg-accent-hover transition-colors"
            >
              Add Job Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
