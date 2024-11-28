import React, { useState, useEffect } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import Logo from "../assets/indonesianature.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthContext"; // Import the custom hook
import axios from "axios";

const Navbar = () => {
  const [isBookingDropdownOpen, setIsBookingDropdownOpen] = useState(false);
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isLoggedIn, logout } = useAuth(); // Access login status and methods
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeBottom = homeSection.getBoundingClientRect().bottom;
        setIsScrolled(homeBottom <= 0);
      }
    };

    setIsScrolled(location.pathname !== "/");
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
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

      navigate("/login"); // Use navigate for programmatic navigation
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  const navItems = [
    { name: "Home", href: "home" },
    { name: "About Us", href: "about" },
    { name: "Destination", href: "destination" },
    { name: "Experience", href: "experience" },
    { name: "FAQs", href: "faq" },
  ];

  const bookingItems = [
    { name: "Flight", path: "/flight" },
    { name: "Hotel", path: "/hotel" },
  ];

  const historyItems = [
    { name: "Flight", path: "/pesawat/histori" },
    { name: "Hotel", path: "/hotel/histori" },
  ];

  const historyLink = isLoggedIn ? (
    <button
      onClick={() => setIsHistoryDropdownOpen(!isHistoryDropdownOpen)}
      className="text-white hover:text-blue-500 flex items-center transition-all duration-300"
    >
      History <FaChevronDown className="ml-2" />
    </button>
  ) : null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-2 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-50 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img src={Logo} alt="Logo indonesianature" className="w-40 h-7" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-white hover:text-blue-500 transition-all duration-300"
            >
              {item.name}
            </button>
          ))}

          {/* Dropdown Booking */}
          <div className="relative">
            <button
              onClick={() => setIsBookingDropdownOpen(!isBookingDropdownOpen)}
              className="text-white hover:text-blue-500 flex items-center transition-all duration-300"
            >
              Booking <FaChevronDown className="ml-2" />
            </button>
            {isBookingDropdownOpen && (
              <div className="absolute bg-gray-700 rounded shadow-lg w-24 text-center">
                {/* Smaller width */}
                {bookingItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-white hover:bg-blue-500 rounded transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsHistoryDropdownOpen(!isHistoryDropdownOpen)}
              className="text-white hover:text-blue-500 flex items-center transition-all duration-300"
            >
              History <FaChevronDown className="ml-2" />
            </button>
            {isHistoryDropdownOpen && (
              <div className="absolute bg-gray-700 rounded shadow-lg w-24 text-center">
                {/* Smaller width */}
                {historyItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-white hover:bg-blue-500 rounded transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Login/Logout and Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 font-semibold text-white rounded-md border border-white hover:bg-white hover:text-black transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 font-semibold text-black border bg-white border-white rounded-md transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden cursor-pointer z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl focus:outline-none mt-3"
          >
            {isMenuOpen ? <FaTimes /> : <HiBars3BottomRight />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-0 rounded-xl bg-black bg-opacity-50 backdrop-blur-sm z-40 pt-5 gap-y-8 cursor-pointer max-h-screen overflow-y-auto m-3">
          <div className="max-w-screen-sm mx-auto rounded-lg p-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block px-4 py-2 text-white hover:text-[26px] transition-all duration-300"
              >
                {item.name}
              </button>
            ))}

            {/* Dropdown Booking */}
            <div className="relative">
              <button
                onClick={() => setIsBookingDropdownOpen(!isBookingDropdownOpen)}
                className="block w-full text-left px-4 py-2 text-white hover:text-[28px] focus:outline-none transition-all duration-300"
              >
                Booking <FaChevronDown className="inline ml-2" />
              </button>
              {isBookingDropdownOpen && (
                <div>
                  {bookingItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-8 py-2 text-white transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* History Link (Visible only when logged in) */}
            {isLoggedIn && (
              <button
                onClick={() => setIsHistoryDropdownOpen(!isHistoryDropdownOpen)}
                className="block w-full text-left px-4 py-2 text-white hover:text-[28px] focus:outline-none transition-all duration-300"
              >
                History <FaChevronDown className="inline ml-2" />
              </button>
            )}
            {isHistoryDropdownOpen && (
              <div>
                {historyItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-8 py-2 text-white transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Login/Logout */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block w-full text-white px-4 py-2 mt-4 text-center"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-white px-4 py-2 mt-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full text-white text-center px-4 py-2 mt-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-black bg-white px-4 py-2 mt-4"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
