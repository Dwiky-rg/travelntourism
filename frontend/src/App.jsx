import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UserDashboard from "./pages/UserDashboard";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotel from "./pages/Hotel";
import Flight from "./pages/Flight";
import AdminDashboard from "./pages/AdminDashboard";
import AddFlightForm from "./components/admin/AddFlightForm";
import AddHotelForm from "./components/admin/AddHotelForm";
import UserData from "./components/admin/UserData";
import ConfirmPayment from "./components/admin/ConfirmPayment";
import PesawatList from "./components/admin/PesawatList";
import FlightDetailPayment from "./pages/FlightDetailPayment";
import NotFound from "./pages/NotFound";
import PaymentPage from "./components/admin/PaymentPages";
import ProfileInformation from "./pages/ProfileInformation";
import HotelDetailPayment from "./pages/HotelDetailPayment";
import BookingHotelList from "./pages/BookingHotelList";
import ConfirmBookingHotel from "./components/admin/ConfirmBookingHotel";
import PaymentHotelPage from "./pages/PaymentHotelPage";
import BookingPesawatList from "./pages/BookingPesawatList";

// Protected route for admin access
const ProtectedAdminRoute = ({ children }) => {
  // Retrieve the user role from localStorage
  const userRole = localStorage.getItem("userRole");

  // Check if the user is an admin
  if (!userRole || userRole !== "admin") {
    return <Navigate to="/404" replace />; // Redirect to 404 page if not an admin
  }

  return children; // Allow access if the user is an admin
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-flight" element={<AddFlightForm />} />
            <Route path="airlines" element={<PesawatList />} />
            <Route path="add-hotel" element={<AddHotelForm />} />
            <Route path="user-data" element={<UserData />} />
            <Route path="bookings/pesawat" element={<ConfirmPayment />} />
            <Route path="payment/pesawat" element={<PaymentPage />} />
            <Route path="booking/hotel" element={<ConfirmBookingHotel />} />
            <Route path="payment/hotel" element={<PaymentHotelPage />} />
          </Route>

          {/* Route for Login */}
          <Route path="/login" element={<Login />} />

          {/* Route for Register */}
          <Route path="/register" element={<Register />} />

          {/* User Dashboard Route */}
          <Route
            path="/"
            element={
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            }
          />

          {/* Flight Routes */}
          <Route
            path="/flight"
            element={
              <UserLayout>
                <Flight />
              </UserLayout>
            }
          />
          <Route
            path="/flight/booking/:id"
            element={
              <UserLayout>
                <FlightDetailPayment />
              </UserLayout>
            }
          />
          <Route
            path="/hotel/booking/:id"
            element={
              <UserLayout>
                <HotelDetailPayment />
              </UserLayout>
            }
          />
          <Route
            path="/hotel/histori"
            element={
              <UserLayout>
                <BookingHotelList />
              </UserLayout>
            }
          />
          <Route
            path="/pesawat/histori"
            element={
              <UserLayout>
                <BookingPesawatList />
              </UserLayout>
            }
          />

          {/* Hotel Route */}
          <Route
            path="/hotel"
            element={
              <UserLayout>
                <Hotel />
              </UserLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <UserLayout>
                <ProfileInformation />
              </UserLayout>
            }
          />

          {/* 404 Page Route */}
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
