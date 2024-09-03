import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6"> {/* Full-width background and padding */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              User Email
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((user) => (
            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </td>
              <td className="px-6 py-4">
                {user.email}
              </td>
              <td className="px-6 py-4 space-x-2">
                <Link to={`/updateuser/${user._id}`} className="text-blue-500 hover:text-blue-700">
                  Update
                </Link>
                <Link to={`/delete/${user._id}`} className="text-red-500 hover:text-red-700">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8 flex justify-end">
        <Link 
          to='/adduser' 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add User
        </Link>
      </div>
    </div>
  );
}

export default Home;
