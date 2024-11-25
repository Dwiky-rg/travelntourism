import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import baliImage from "../assets/bali.jpg";

const UserProfile = ({ isMobile }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    profileImage: "", // Gambar profil pengguna
  });
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserDetails({
          name: data.name || "John Doe",
          email: data.email || "johndoe@example.com",
          image: data.image || "", // Assuming the API returns the image URL or path
        });

        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Failed to fetch user data. Please try again later.");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleProfileClick = () => {
    setShowModal(true); // Menampilkan modal saat gambar profil diklik
  };

  const handleCloseModal = () => {
    setShowModal(false); // Menutup modal
  };

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Token tidak ditemukan. Anda perlu login ulang.");
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  return isLoggedIn ? (
    <>
      <div className="relative inline-block">
        <div className={`relative flex items-center ${isMobile ? "w-16 h-16" : "w-[180px] left-28"}`}>
          <FaEnvelope className="text-white mr-4" /> {/* Icon message */}
          <div className="relative">
            <img src={userDetails.image ? `/images-users/${userDetails.image}` : baliImage} alt="User Profile" className="rounded-full w-8 h-8 object-cover cursor-pointer" onClick={handleProfileClick} />
          </div>
        </div>

        {showModal && (
          <div
            className="absolute top-full mt-3 right-0 bg-white p-6 rounded-lg w-80 shadow-xl border border-gray-200"
            onClick={handleCloseModal} // Close modal when clicking outside
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">User Profile</h2>
                <div className="mb-4">
                  <img src={userDetails.image ? `/images-users/${userDetails.image}` : baliImage} alt="User Profile" className="rounded-full w-24 h-24 object-cover mx-auto mb-4" />
                  <p className="text-lg text-gray-600">{userDetails.name}</p>
                  <p className="text-sm text-gray-500">{userDetails.email}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <Link to="/profile" className="block text-center text-blue-600 hover:text-blue-800 underline" onClick={handleCloseModal}>
                  Edit Profile
                </Link>

                <button onClick={handleLogout} className="w-full text-center text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-sm">
                  Logout
                </button>
              </div>
              <button onClick={handleCloseModal} className="absolute top-2 right-2 cursor-pointer text-2xl hover:text-red-500 transition duration-300">
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <div className={`flex ${isMobile ? "flex-col items-center" : "space-x-2 w-[180px]"}`}>
      <Link to="/login" className={`${isMobile ? "w-full text-center" : ""} text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition-all duration-300`}>
        Login
      </Link>
      <Link to="/register" className={`${isMobile ? "w-full text-center mt-2" : ""} text-white bg-blue-500 px-4 py-1 rounded hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 transition-all duration-300`}>
        Register
      </Link>
    </div>
  );
};

export default UserProfile;
