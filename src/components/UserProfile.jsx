import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.jpeg";

const UserProfile = ({ isMobile }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const loggedInStatus = false; // Simulasi pengguna sudah login
    setIsLoggedIn(loggedInStatus);

    if (loggedInStatus) {
      setUserProfile(Profile); // Gambar profil
    }
  }, []);

  return isLoggedIn ? (
    <img
      src={userProfile}
      alt="User Profile"
      className={`rounded-full cursor-pointer border border-white ${
        isMobile ? "w-16 h-16" : "w-12 h-12"
      }`}
    />
  ) : (
    <div className={`flex ${isMobile ? "flex-col items-center" : "space-x-4"}`}>
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
