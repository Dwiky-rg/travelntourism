// ProtectedAdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  // Retrieve the user role from localStorage
  const userRole = localStorage.getItem("userRole");

  // Check if the user is logged in and is an admin
  if (!userRole || userRole !== "admin") {
    return <Navigate to="/404" replace />; // Redirect to 404 page if not an admin
  }

  return children; // Allow access if the user is an admin
};

export default ProtectedAdminRoute;
