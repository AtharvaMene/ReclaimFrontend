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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Item Details</h2>
      {error && <p className="text-red-600">{error}</p>}
      {item ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date Reported:</strong> {item.dateReported}</p>
          <p><strong>Verified:</strong> {item.verified ? "Yes" : "No"}</p>
        </div>
      ) : !error ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
};

export default ItemDetails;
