// src/pages/ReportLostItem.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReportLostItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    dateReported: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.location) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/items/report",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Lost item reported successfully!");
        setFormData({
          name: "",
          description: "",
          location: "",
          dateReported: "",
        });
        // Optionally redirect after delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to report lost item. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Report Lost Item</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium" htmlFor="name">
          Item Name*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Item name"
          required
        />

        <label className="block mb-2 font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Additional details"
          rows={3}
        />

        <label className="block mb-2 font-medium" htmlFor="location">
          Location Lost*
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Where item was lost"
          required
        />

        <label className="block mb-2 font-medium" htmlFor="dateReported">
          Date Reported
        </label>
        <input
          id="dateReported"
          name="dateReported"
          type="date"
          value={formData.dateReported}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Report Item
        </button>
      </form>
    </div>
  );
};

export default ReportLostItem;
