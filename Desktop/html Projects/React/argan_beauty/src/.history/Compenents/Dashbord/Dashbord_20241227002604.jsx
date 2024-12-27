import React, { useEffect, useState } from "react";

const Dashboard = () => {
  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const personne=[
    {
      id:1,
      name:"chouaib",
      email:"chouaib@gmail.com",
      phoe:"068888882"

    }
  ]

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("https://fe14-196-117-24-244.ngrok-free.app/Argan_beauty/auth.php");
  //       const data = await response.json();
  //       if (!response.ok) {
  //         throw new Error(data.error || "Failed to fetch users");
  //       }
  //       setUsers(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  // const handleDelete = async (userId) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     try {
  //       const response = await fetch(`https://fe14-196-117-24-244.ngrok-free.app/Argan_beauty/auth.php/${userId}`, {
  //         method: "DELETE",
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to delete user");
  //       }
  //       setUsers(users.filter((user) => user.id !== userId));
  //       alert("User deleted successfully!");
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p className="text-red-600 font-medium">{error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h1>
{/*  ==     
      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : ( */}
        <div className="overflow-x-auto shadow-sm rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {personne.map((persono) => (
                <tr key={persono.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persono.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persono.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persono.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persono.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      
                      className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </div>
  );
};

export default Dashboard;