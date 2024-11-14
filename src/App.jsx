import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotel from "./pages/Hotel";
import Flight from "./pages/Flight";
import AdminDashboard from "./pages/AdminDashboard";
import AddFlightForm from "./components/admin/AddFlightForm"; // Import AddFlightForm
import AddHotelForm from "./components/admin/AddHotelForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Dashboard User */}
        <Route
          path="/"
          element={
            <UserLayout>
              <UserDashboard />
            </UserLayout>
          }
        />

        {/* Halaman Dashboard Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-flight" element={<AddFlightForm />} />
          <Route path="add-hotel" element={<AddHotelForm />} />
        </Route>

        {/* Route untuk halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Route untuk halaman Register */}
        <Route path="/register" element={<Register />} />

        {/* Route untuk halaman Flight */}
        <Route
          path="/flight"
          element={
            <UserLayout>
              <Flight />
            </UserLayout>
          }
        />

        {/* Route untuk halaman Hotel */}
        <Route
          path="/hotel"
          element={
            <UserLayout>
              <Hotel />
            </UserLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
