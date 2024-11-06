import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";

const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-100">
    {/* Navbar Admin */}
    <div className="p-6">
      <NavbarAdmin />
    </div>

    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Text */}
      <p className="text-lg text-gray-600">
        Welcome to the admin dashboard! You can manage users, settings, and more
        from here.
      </p>

      {/* Add more content as needed */}
    </div>
  </div>
);

export default AdminDashboard;
