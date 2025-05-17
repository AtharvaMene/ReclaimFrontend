import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to Reclaim</h1>
      <p className="text-lg mb-6 text-gray-700 max-w-xl">
        Reclaim is your trusted platform to report and find lost items securely on campus. 
        Whether you're a student or an admin, we've got your back.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Register
        </Link>
      </div>

      <div className="mt-10 font-bold mb-4 font-sans">Developed By Atharva Mene</div>
    </div>
  );
}

export default Home;
