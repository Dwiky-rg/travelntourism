import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const UserData = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [editingIndex, setEditingIndex] = useState(null); // Index of the user being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate data submission
    setTimeout(() => {
      setLoading(false);
      setMessage("User added successfully!");
      setIsSuccess(true);

      // If editing, update the user; else add new user
      if (editingIndex !== null) {
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = formData;
        setUsers(updatedUsers);
        setEditingIndex(null); // Reset after edit
      } else {
        setUsers([...users, formData]);
      }

      setFormData({
        userName: "",
        email: "",
        phone: "",
        address: "",
        role: "",
      });
      setMessage("");
      setShowModal(false); // Close modal after submission
    }, 2000);
  };

  // Function to handle editing user data
  const handleEdit = (index) => {
    const userToEdit = users[index];
    setFormData(userToEdit); // Set form data to the user's data to edit
    setEditingIndex(index); // Set the index of the user being edited
    setShowModal(true); // Show the modal for editing
  };

  // Function to delete a user
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers); // Remove the user from the list
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <FaUser className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">User Management</h1>
      </div>

      {message && (
        <p className={`mb-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      {/* Button to Add New User */}
      <button
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4"
        onClick={() => setShowModal(true)} // Show the modal when clicked
      >
        Add New User
      </button>

      {/* Table displaying users */}
      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">User Data</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2">User Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>{" "}
              {/* Column for Edit/Delete buttons */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="bg-gray-800 text-white">
                <td className="p-2">{user.userName}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 flex space-x-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-2/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingIndex !== null ? "Edit User" : "Add New User"}
              </h2>
              <button
                className="text-xl font-bold"
                onClick={() => setShowModal(false)} // Close the modal
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* User Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Address */}
                <div className="mb-4 col-span-2">
                  <label className="block text-gray-700 font-bold">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Role */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center mt-4"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
                    viewBox="0 0 24 24"
                  ></svg>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserData;
