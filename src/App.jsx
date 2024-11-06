import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Untuk routing
import UserDashboard from "./pages/UserDashboard"; // Halaman Dashboard User
import AdminDashboard from "./pages/AdminDashboard"; // Halaman Dashboard Admin
import UserLayout from "./layouts/UserLayout"; // Layout untuk Dashboard User
import AdminLayout from "./layouts/AdminLayout"; // Layout untuk Dashboard Admin
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotel from "./pages/Hotel";
import Flight from "./pages/Flight";

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Dashboard User */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />{" "}
          {/* Home page menggunakan DashboardUser */}
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
        </Route>

        {/* Halaman Dashboard Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Route untuk halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Route untuk halaman Register */}
        <Route path="/register" element={<Register />} />

        {/* Route untuk halaman Flight */}
        <Route path="/flight" element={<Flight />} />

        {/* Route untuk halaman Hotel */}
        <Route path="/hotel" element={<Hotel />} />
      </Routes>
    </Router>
  );
}

export default App;
