import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post("http://localhost:5000/adduser", { name, email });
      if (response.status === 201) {
        // Redirect to the home page or show success message
        navigate("/"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError("An error occurred while adding the user. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter user name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter user email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
