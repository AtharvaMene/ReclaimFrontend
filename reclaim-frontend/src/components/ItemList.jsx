import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // <-- import Link
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
    <div>
      <h2>{status ? `${status} Items` : "All Items"}</h2>

      {error && <p className="text-red-600">{error}</p>}

      {items.length === 0 && !error ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={`/items/${item.id}`}
                className="text-blue-600 underline"
              >
                <strong>{item.name}</strong>
              </Link>{" "}
              - {item.description} - Location: {item.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemsList;
