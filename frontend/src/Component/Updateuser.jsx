import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Updateuser() {
  const { id } = useParams(); // Get the user ID from the URL params
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateuser/${id}`, { name, email });
        navigate('/')
    } catch (error) {
      setError("Failed to update user.");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>
        {user && (
          <form onSubmit={handleSubmit}>
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
                Update User
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Updateuser;
