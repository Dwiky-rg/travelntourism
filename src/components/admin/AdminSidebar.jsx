import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaHotel, FaSignOutAlt } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const NavItem = ({ to, icon: Icon, label, collapsed, isActive, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick} // Fungsi untuk menandai item yang aktif
    className={({ isActive: linkIsActive }) =>
      `flex items-center font-poppins uppercase font-[400] p-3 transition-all duration-200 ${
        isActive || linkIsActive ? "bg-[#4880FF] rounded-lg" : "rounded"
      } ${collapsed ? "justify-center" : ""}`
    }
    title={collapsed ? label : ""}
  >
    <Icon className="transition-all duration-200" />
    <span
      className={`${collapsed ? "hidden" : "ml-2"} transition-all duration-200`}
    >
      {label}
    </span>
  </NavLink>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/admin"); // Menyimpan menu yang aktif

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set menu yang aktif
  };

  return (
    <aside
      className={`bg-[#0F2D44] text-white h-auto py-4 transition-width duration-300 overflow-hidden ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Tombol menu di pojok kanan atas sidebar */}
      <button
        className="text-white text-2xl px-4 font-semibold ml-auto flex items-center justify-center rounded transition-all duration-200"
        onClick={() => setCollapsed(!collapsed)}
      >
        <HiOutlineMenuAlt3 className="text-[#8c52ff]" />
      </button>

      <div className="flex items-center mt-4 mb-4 border-b border-gray-200 pb-5 px-4">
        <FaUser className="text-3xl" />
        <p
          className={`${
            collapsed ? "hidden" : "ml-2"
          } transition-all duration-200`}
        >
          Admin
        </p>
      </div>

      <nav className="space-y-2 px-2">
        <NavItem
          to="/admin/dashboard"
          icon={MdDashboard}
          label="Dashboard"
          collapsed={collapsed}
          isActive={activeMenu === "/admin/dashboard"}
          onClick={() => handleMenuClick("/admin/dashboard")} // Menandai Dashboard sebagai aktif
        />
        <NavItem
          to="/admin/user-data"
          icon={FaUser}
          label="User"
          collapsed={collapsed}
          isActive={activeMenu === "/admin/user-data"}
          onClick={() => handleMenuClick("/admin/user-data")} // Menandai Profile sebagai aktif
        />
        <NavItem
          to="/admin/confirm-payment"
          icon={RiMoneyDollarCircleFill}
          label="Payment"
          collapsed={collapsed}
          isActive={activeMenu === "/admin/confirm-payment"}
          onClick={() => handleMenuClick("/admin/confirm-payment")} // Menandai Profile sebagai aktif
        />
        <NavItem
          to="/admin/add-flight"
          icon={GiCommercialAirplane}
          label="Flight"
          collapsed={collapsed}
          isActive={activeMenu === "/admin/add-flight"}
          onClick={() => handleMenuClick("/admin/add-flight")} // Menandai Add Flight sebagai aktif
        />
        <NavItem
          to="/admin/add-hotel"
          icon={FaHotel}
          label="Hotel"
          collapsed={collapsed}
          isActive={activeMenu === "/admin/add-hotel"}
          onClick={() => handleMenuClick("/admin/add-hotel")} // Menandai Add Flight sebagai aktif
        />
        <NavItem
          to="/"
          icon={FaSignOutAlt}
          label="Logout"
          collapsed={collapsed}
          isActive={activeMenu === "/logout"}
          onClick={() => handleMenuClick("/logout")} // Menandai Logout sebagai aktif
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
