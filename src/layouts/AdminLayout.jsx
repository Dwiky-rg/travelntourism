import React from "react";
import Sidebar from "../components/AdminSidebar"; // Sidebar untuk admin
import { Outlet } from "react-router-dom"; // Untuk rendering komponen anak

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar untuk admin */}
      <div className="flex-1">
        <Outlet />{" "}
        {/* Ini untuk merender halaman anak seperti DashboardAdmin */}
      </div>
    </div>
  );
};

export default AdminLayout;
