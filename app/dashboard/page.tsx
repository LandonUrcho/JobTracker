export default function Dashboard() {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <p className="text-gray-600 mt-2">Total Applications</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">0</div>
            <p className="text-gray-600 mt-2">Interviews Scheduled</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600">0</div>
            <p className="text-gray-600 mt-2">Offers Received</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity yet. Start by adding your first job application!</p>
        </div>
      </div>
    </div>
  );
}
