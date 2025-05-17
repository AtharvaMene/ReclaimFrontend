import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const fetchUnverifiedItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/items/unverified"
      );
      setItems(response.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch unverified items.");
    }
  };

  const handleVerify = async (itemId) => {
    try {
      await axios.put(`http://localhost:8080/items/verify/${itemId}`);
      fetchUnverifiedItems(); // Refresh list after verification
    } catch (err) {
      console.log(err);
      alert("Verification failed");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/items/${itemId}`);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  useEffect(() => {
    fetchUnverifiedItems();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Unverified Items</h2>

      {error && <div className="text-red-600">{error}</div>}

      {items.length === 0 ? (
        <p>No unverified items found.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow">
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <button
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
                onClick={() => handleVerify(item.id)}
              >
                Verify
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded ml-2 hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
