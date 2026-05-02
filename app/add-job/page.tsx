'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJobApplication } from '@/lib/commands';

export default function AddJob() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (!storedUserId) {
      router.push('/login');
      return;
    }

    setUserId(Number(storedUserId));
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!userId) {
      setError('Please log in before adding a job application.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);

    try {
      await createJobApplication({
        userId,
        companyName: String(formData.get('company') || ''),
        jobTitle: String(formData.get('position') || ''),
        jobLocation: String(formData.get('location') || ''),
        status: String(formData.get('status') || 'Applied'),
        dateApplied: String(formData.get('date') || ''),
        companyWebsite: String(formData.get('website') || ''),
        companyAddress: String(formData.get('address') || ''),
      });

      router.push('/jobs');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Unable to add this job application. Please check the form and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <aside className="bg-gradient-to-br from-primary-500/20 via-background-secondary to-secondary-500/10 rounded-2xl border border-border p-8 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent mb-3">
              Job Search CRM
            </p>
            <h1 className="text-4xl font-bold text-foreground mb-4">Add a job application</h1>
            <p className="text-foreground-secondary mb-6">
              Save the company, role, location, status, and application date in one database transaction so your tracker stays consistent.
            </p>
            <div className="space-y-4 text-sm text-foreground-secondary">
              <div className="rounded-xl bg-background/70 border border-border p-4">
                <p className="font-semibold text-foreground">What happens next?</p>
                <p>You will be redirected to your Jobs page after the record is created.</p>
              </div>
              <div className="rounded-xl bg-background/70 border border-border p-4">
                <p className="font-semibold text-foreground">Required fields</p>
                <p>Company, position, location, status, and application date are needed for a complete application.</p>
              </div>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="bg-background-secondary rounded-2xl shadow-xl border border-border p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground">Application details</h2>
              <p className="text-foreground-tertiary mt-1">Use professional, realistic data for your database evidence.</p>
            </div>

            {error && (
              <div className="mb-6 rounded-lg border border-error-500/40 bg-error-500/10 px-4 py-3 text-sm text-error-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-foreground-secondary mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                placeholder="e.g., Acme Corporation"
                disabled={isSubmitting}
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
                className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                placeholder="e.g., Software Engineer Intern"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground-secondary mb-2">
                Job Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                placeholder="e.g., Nashville, TN or Remote"
                disabled={isSubmitting}
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
                className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-foreground-secondary mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                disabled={isSubmitting}
              >
                <option>Applied</option>
                <option>Under Review</option>
                <option>Interview Scheduled</option>
                <option>Rejected</option>
                <option>Offer Received</option>
              </select>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-foreground-secondary mb-2">
                Company Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                placeholder="https://company.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-foreground-secondary mb-2">
                Company Address <span className="text-foreground-tertiary">(optional)</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                placeholder="e.g., 123 Market Street, Nashville, TN"
                disabled={isSubmitting}
              />
            </div>

            <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !userId}
              className="w-full rounded-lg bg-white px-6 py-3 font-bold text-black shadow-lg shadow-white/20 ring-1 ring-white/60 hover:bg-neutral-200 hover:shadow-white/30 disabled:cursor-not-allowed disabled:opacity-60 transition-all"
            >
              {isSubmitting ? 'Adding Application...' : 'Add Job Application'}
            </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
