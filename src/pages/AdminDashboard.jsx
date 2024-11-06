import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";

const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-6">
    {/* Navbar Admin */}
    <div className="">
      <NavbarAdmin />
    </div>

    <div className="mt-5">
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
