import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Login = () => {
  const { login } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/users/login", formData);

      if (response.status === 200) {
        login(response.data); 
        setSuccess("Login successful! Redirecting...");
        setError("");
        localStorage.setItem("user", JSON.stringify(response.data));


        // Redirect after a short delay (or immediately)
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@mail.com"
          required
        />

        <label className="block mb-2 font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your password"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
