import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminVerification = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnverifiedItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/items/unverified");
        setItems(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load unverified items.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnverifiedItems();
  }, []);

  const handleVerify = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/items/verify/${id}?status=${status}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError("Failed to update item status.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin: Verify Reported Items</h1>
      {error && <p className="text-red-500">{error}</p>}
      {items.length === 0 && <p>No items to verify.</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-4 p-4 border rounded">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Location: {item.location}</p>
            <button onClick={() => handleVerify(item.id, true)} className="mr-2 bg-green-500 text-white px-3 py-1 rounded">
              Approve
            </button>
            <button onClick={() => handleVerify(item.id, false)} className="bg-red-500 text-white px-3 py-1 rounded">
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminVerification;
