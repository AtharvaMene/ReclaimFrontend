import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
        
      <Link to="/report-lost-item" className="btn btn-primary">
        Report Lost Item
      </Link>

      <nav className="mb-6">
        <Link className="mr-4 text-blue-600" to="/items/LOST">
          View Lost Items
        </Link>
        <Link className="mr-4 text-blue-600" to="/items/FOUND">
          View Found Items
        </Link>
        <Link className="text-blue-600" to="/items">
          View All Items
        </Link>
      </nav>
      {/* other dashboard content */}
    </div>
  );
};

export default Dashboard;
