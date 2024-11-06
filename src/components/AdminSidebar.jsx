// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false); // State untuk mengatur ukuran sidebar

  return (
    <aside
      className={`bg-[#252525] text-white h-screen py-4 transition-width duration-300 ${
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
        <FaUser className="text-3xl" /> {/* Icon user */}
        <p
          className={`${
            collapsed ? "hidden" : "ml-2"
          } transition-all duration-200`}
        >
          Admin
        </p>
      </div>

      <nav className="space-y-2 px-2">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center font-poppins uppercase font-[400] p-3 transition-all duration-200 ${
              isActive ? "bg-[#8c52ff] rounded-full" : "rounded"
            } ${collapsed ? "justify-center" : ""}`
          }
        >
          <FaTachometerAlt className="transition-all duration-200" />
          <span
            className={`${
              collapsed ? "hidden" : "ml-2"
            } transition-all duration-200`}
          >
            Dashboard
          </span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center font-poppins uppercase font-[400] p-3 transition-all duration-200 ${
              isActive ? "bg-[#8c52ff] rounded-full" : "rounded"
            } ${collapsed ? "justify-center" : ""}`
          }
        >
          <FaCog className="transition-all duration-200" />
          <span
            className={`${
              collapsed ? "hidden" : "ml-2"
            } transition-all duration-200`}
          >
            Settings
          </span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center font-poppins uppercase font-[400] p-3 transition-all duration-200 ${
              isActive ? "bg-[#8c52ff] rounded-full" : "rounded"
            } ${collapsed ? "justify-center" : ""}`
          }
        >
          <FaUser className="transition-all duration-200" />
          <span
            className={`${
              collapsed ? "hidden" : "ml-2"
            } transition-all duration-200`}
          >
            Profile
          </span>
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `flex items-center font-poppins uppercase font-[400] p-3 transition-all duration-200 ${
              isActive ? "bg-[#8c52ff] rounded-full" : "rounded"
            } ${collapsed ? "justify-center" : ""}`
          }
        >
          <FaSignOutAlt className="transition-all duration-200" />
          <span
            className={`${
              collapsed ? "hidden" : "ml-2"
            } transition-all duration-200`}
          >
            Logout
          </span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
