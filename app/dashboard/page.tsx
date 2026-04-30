export default function Dashboard() {
  return (
    <div className="flex-1 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-background-secondary rounded-lg shadow border border-border p-6">
            <div className="text-3xl font-bold text-info-500">0</div>
            <p className="text-foreground-secondary mt-2">Total Applications</p>
          </div>
          <div className="bg-background-secondary rounded-lg shadow border border-border p-6">
            <div className="text-3xl font-bold text-success-500">0</div>
            <p className="text-foreground-secondary mt-2">Interviews Scheduled</p>
          </div>
          <div className="bg-background-secondary rounded-lg shadow border border-border p-6">
            <div className="text-3xl font-bold text-secondary-500">0</div>
            <p className="text-foreground-secondary mt-2">Offers Received</p>
          </div>
        </div>

        <div className="bg-background-secondary rounded-lg shadow border border-border p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <p className="text-foreground-secondary">No recent activity yet. Start by adding your first job application!</p>
        </div>
      </div>
    </div>
  );
}
