import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa"; // Import ikon dropdown dan hamburger
import { HiBars3BottomRight } from "react-icons/hi2";
import Logo from "../src/assets/indonesianature.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent ">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img src={Logo} alt="Logo indonesianature" className="w-40 h-7" />
        </div>

        {/* Icon Hamburger untuk mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <HiBars3BottomRight />}
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#home"
            className="text-white hover:text-blue-500 drop-shadow-lg"
          >
            Home
          </a>
          <a
            href="#destination"
            className="text-white hover:text-blue-500 drop-shadow-lg"
          >
            Destination
          </a>
          <a
            href="#experience"
            className="text-white hover:text-blue-500 drop-shadow-lg"
          >
            Experience
          </a>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-white hover:text-blue-500 focus:outline-none drop-shadow-lg"
            >
              Booking <FaChevronDown className="ml-2 mt-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-transparent rounded shadow-lg">
                <a
                  href="#pesawat"
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                >
                  Pesawat
                </a>
                <a
                  href="#hotel"
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                >
                  Hotel
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Buttons Desktop */}
        <div className="hidden md:flex space-x-4">
          <button className="text-blue-500 border border-blue-500 px-7 py-1 rounded hover:bg-blue-500 hover:text-white drop-shadow-lg">
            Login
          </button>
          <button className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 drop-shadow-lg">
            Register
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <a
            href="#home"
            className="block px-4 py-2 text-white hover:bg-blue-500"
          >
            Home
          </a>
          <a
            href="#destination"
            className="block px-4 py-2 text-white hover:bg-blue-500"
          >
            Destination
          </a>
          <a
            href="#experience"
            className="block px-4 py-2 text-white hover:bg-blue-500"
          >
            Experience
          </a>

          {/* Dropdown pada Mobile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="block w-full text-left px-4 py-2 text-white hover:bg-blue-500 focus:outline-none"
            >
              Booking <FaChevronDown className="inline ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="bg-gray-700">
                <a
                  href="#pesawat"
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                >
                  Pesawat
                </a>
                <a
                  href="#hotel"
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                >
                  Hotel
                </a>
              </div>
            )}
          </div>

          {/* Buttons untuk Mobile */}
          <div className="flex flex-col space-y-2 mt-4 px-4 pb-4">
            <button className="text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white drop-shadow-lg">
              Login
            </button>
            <button className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 drop-shadow-lg">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
