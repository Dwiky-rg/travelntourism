import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet dari react-router-dom
import Sidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64" />
      <main className="flex-1 p-6 bg-[#041E31]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
