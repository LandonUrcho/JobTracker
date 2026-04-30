export default function Jobs() {
  return (
    <div className="flex-1 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Your Job Applications</h1>
        </div>

        <div className="bg-background-secondary rounded-lg shadow border border-border overflow-hidden">
          <div className="px-6 py-8 text-center">
            <p className="text-foreground-secondary text-lg">No job applications yet.</p>
            <p className="text-foreground-tertiary">Start tracking your job search by adding your first application.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
