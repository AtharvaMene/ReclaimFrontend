import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/items/${id}`);
        setItem(response.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch item.");
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Item Details</h2>
      {error && <p className="text-red-600">{error}</p>}
      {item ? (
        <div className="space-y-3 text-gray-800">
          <p>
            <strong>Name:</strong> {item.name}
          </p>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Status:</strong> {item.status}
          </p>
          <p>
            <strong>Location:</strong> {item.location}
          </p>
          <p>
            <strong>Date Reported:</strong> {new Date(item.dateReported).toLocaleDateString()}
          </p>
          <p>
            <strong>Verified:</strong> {item.verified ? "Yes" : "No"}
          </p>
        </div>
      ) : !error ? (
        <p className="text-gray-600">Loading...</p>
      ) : null}
    </div>
  );
};

export default ItemDetails;
