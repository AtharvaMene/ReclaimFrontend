import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";  // Adjust path if needed

const ReportLostItem = () => {
  const { user } = useContext(AuthContext);  // Get logged-in user from context

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    status: "LOST", // Default to LOST
    dateReported: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [matches, setMatches] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      setError("You must be logged in to report an item.");
      return;
    }

    try {
      // Add reportedBy user ID as object
      const payload = {
        ...formData,
        reportedBy: {
          id: user.id,
        },
      };

      const response = await axios.post("http://localhost:8080/items/report", payload);
      if (response.status === 200 || response.status === 201) {
        setSuccess("Item reported successfully.");
        setFormData({
          name: "",
          description: "",
          location: "",
          status: "LOST",
          dateReported: "",
        });

        // Get the ID of the newly reported item
        const reportedItemId = response.data.id;

        // Fetch possible matches from backend
        const matchesResponse = await axios.get(`http://localhost:8080/items/matches/${reportedItemId}`);
        setMatches(matchesResponse.data);
      }
    } catch (err) {
      setError("Failed to report item.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Report Lost Item</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Item description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Where was it lost?"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="date"
          name="dateReported"
          value={formData.dateReported}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
        >
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {matches.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Possible Matches:</h3>
          <ul>
            {matches.map((item) => (
              <li key={item.id} className="mb-2 border p-2 rounded">
                <strong>{item.name}</strong> - {item.description} (Status: {item.status})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportLostItem;
