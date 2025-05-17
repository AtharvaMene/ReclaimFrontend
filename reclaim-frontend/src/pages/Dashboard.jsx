import { Link } from "react-router-dom";

const Dashboard = () => {
  const statCards = [
    {
      title: "Lost Items",
      count: 24,
      icon: "🔍",
      path: "/items/status/LOST",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Found Items",
      count: 18,
      icon: "✓",
      path: "/items/status/FOUND",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Lost & Found Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage lost items and help people reunite with their belongings
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <Link
            to="/report-lost-item"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Report Lost Item
          </Link>
          
          <Link
            to="/report-lost-item"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Report Found Item
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className={`${card.color} ${card.hoverColor} rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="px-6 py-5 sm:px-8 sm:py-6 text-white">
                <div className="flex items-center">
                  <div className="text-3xl font-bold mr-3">{card.icon}</div>
                  <div>
                    <p className="text-xl font-semibold">{card.title}</p>
                    <p className="text-4xl font-bold mt-2">{card.count}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent items section */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Items</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { id: 1, name: "Blue Backpack", status: "LOST", date: "May 15, 2025", location: "Sports Building" },
              { id: 2, name: "iPhone 15", status: "FOUND", date: "May 14, 2025", location: "Somiaya Amphitheater" },
              { id: 3, name: "Water Bottle", status: "LOST", date: "May 13, 2025", location: "Gym" }
            ].map((item) => (
              <Link key={item.id} to={`/items/${item.id}`} className="block hover:bg-gray-50">
                <div className="px-6 py-4 flex items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.location} • {item.date}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "LOST"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <Link to="/items" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all items →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;