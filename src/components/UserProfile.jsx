import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/John.jpg";
import {
  FaTimes,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaBirthdayCake,
  FaGenderless,
} from "react-icons/fa";

const UserProfile = ({ isMobile }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "John Doe",
    gender: "Male",
    birthDate: "1990-01-01",
    phone: "+1234567890",
    email: "johndoe@example.com",
    profileImage: Profile, // Gambar profil pengguna
  });

  useEffect(() => {
    const loggedInStatus = true; // Simulasi pengguna sudah login
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleProfileClick = () => {
    setShowModal(true); // Menampilkan modal saat gambar profil diklik
  };

  const handleCloseModal = () => {
    setShowModal(false); // Menutup modal
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulasi logout
    setShowModal(false); // Menutup modal saat logout
  };

  return isLoggedIn ? (
    <>
      <div className="relative inline-block">
        <div
          className={`relative flex items-center ${
            isMobile ? "w-16 h-16" : "w-[180px] left-28"
          }`}
        >
          {/* Ikon Pesan di sebelah kiri gambar profil */}
          <FaEnvelope className="text-white mr-4" /> {/* Ikon pesan */}
          {/* Gambar profil */}
          <div className="relative">
            <img
              src={userDetails.profileImage}
              alt="User Profile"
              className="rounded-full w-8 object-cover cursor-pointer"
              onClick={handleProfileClick}
            />
          </div>
        </div>

        {showModal && (
          <div
            className="absolute top-full mt-3 right-0 bg-white p-6 rounded-lg w-80 shadow-xl border border-gray-200"
            onClick={handleCloseModal} // Close modal when clicking outside the modal
          >
            {/* Modal Content */}
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
              <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
                User Profile
              </h2>
              <div className="space-y-4">
                <p className="flex items-center text-sm text-gray-700">
                  <FaUser className="mr-2 text-gray-500" />
                  <strong className="font-medium text-gray-900">
                    Full Name:
                  </strong>{" "}
                  {userDetails.fullName}
                </p>
                <p className="flex items-center text-sm text-gray-700">
                  <FaGenderless className="mr-2 text-gray-500" />
                  <strong className="font-medium text-gray-900">
                    Gender:
                  </strong>{" "}
                  {userDetails.gender}
                </p>
                <p className="flex items-center text-sm text-gray-700">
                  <FaBirthdayCake className="mr-2 text-gray-500" />
                  <strong className="font-medium text-gray-900">
                    Birth Date:
                  </strong>{" "}
                  {userDetails.birthDate}
                </p>
                <p className="flex items-center text-sm text-gray-700">
                  <FaPhoneAlt className="mr-2 text-gray-500" />
                  <strong className="font-medium text-gray-900">
                    Phone:
                  </strong>{" "}
                  {userDetails.phone}
                </p>
                <p className="flex items-center text-sm text-gray-700">
                  <FaEnvelope className="mr-2 text-gray-500" />
                  <strong className="font-medium text-gray-900">
                    Email:
                  </strong>{" "}
                  {userDetails.email}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <Link
                  to="/edit-profile"
                  className="block text-center text-blue-600 hover:text-blue-800 underline"
                  onClick={handleCloseModal}
                >
                  Edit Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-center text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-sm"
                >
                  Logout
                </button>
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 cursor-pointer text-2xl hover:text-red-500 transition duration-300"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <div
      className={`flex ${
        isMobile ? "flex-col items-center" : "space-x-2 w-[180px]"
      }`}
    >
      <Link
        to="/login"
        className={`${
          isMobile ? "w-full text-center" : ""
        } text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition-all duration-300`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`${
          isMobile ? "w-full text-center mt-2" : ""
        } text-white bg-blue-500 px-4 py-1 rounded hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 transition-all duration-300`}
      >
        Register
      </Link>
    </div>
  );
};

export default UserProfile;
