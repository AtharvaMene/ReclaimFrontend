import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ItemsList = () => {
  const { status } = useParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const url = status
          ? `http://localhost:8080/items/status/${status}`
          : "http://localhost:8080/items";
        const response = await axios.get(url);
        setItems(response.data);
        setError("");
      } catch (err) {
        console.log(err);
        setError("Failed to fetch items.");
        setItems([]);
      }
    };

    fetchItems();
  }, [status]);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 border-b pb-4 border-blue-200">
        {status ? `${status} Items` : "All Items"}
      </h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {items.length === 0 && !error ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">No items found.</p>
        </div>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <Link to={`/items/${item.id}`} className="block p-6">
                <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  {item.name}
                </h3>
                <p className="text-gray-700 mt-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center mt-4 text-gray-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-sm font-medium">{item.location}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemsList;