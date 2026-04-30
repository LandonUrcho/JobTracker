export default function About() {
  return (
    <div className="flex-1 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">About Job Tracker</h1>

        <div className="bg-background-secondary rounded-lg shadow border border-border p-8 mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is Job Tracker?</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            Job Tracker is a simple, intuitive application designed to help you manage your job search effectively. 
            Keep track of all your job applications, interview schedules, and opportunities in one centralized location.
          </p>
          <p className="text-foreground-secondary leading-relaxed">
            Whether you are actively job hunting or exploring new opportunities, Job Tracker helps you stay organized 
            and never miss an important deadline or follow-up.
          </p>
        </div>

        <div className="bg-background-secondary rounded-lg shadow border border-border p-8 mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Features</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-foreground-secondary">
              <span className="text-accent font-bold mr-3">✓</span>
              Track all your job applications in one place
            </li>
            <li className="flex items-center text-foreground-secondary">
              <span className="text-accent font-bold mr-3">✓</span>
              Monitor application status and progress
            </li>
            <li className="flex items-center text-foreground-secondary">
              <span className="text-accent font-bold mr-3">✓</span>
              View dashboard with key metrics
            </li>
            <li className="flex items-center text-foreground-secondary">
              <span className="text-accent font-bold mr-3">✓</span>
              Add notes and details for each application
            </li>
          </ul>
        </div>

        <div className="bg-background-secondary rounded-lg shadow border border-border p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Version</h2>
          <p className="text-foreground-secondary">Version 0.1.0 - Beta</p>
        </div>
      </div>
    </div>
  );
}
