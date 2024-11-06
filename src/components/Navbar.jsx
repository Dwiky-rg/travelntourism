import React, { useState } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import Logo from "../assets/indonesianature.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Destination", href: "#destination" },
    { name: "Experience", href: "#experience" },
  ];

  const bookingItems = [
    { name: "Pesawat", href: "#pesawat" },
    { name: "Hotel", href: "#hotel" },
  ];

  return (
    <nav className="bg-transparent relative z-50">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <img src={Logo} alt="Logo indonesianature" className="w-40 h-7" />
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white hover:text-blue-500 transition-all duration-300"
            >
              {item.name}
            </a>
          ))}

          {/* Dropdown Desktop */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white hover:text-blue-500 flex items-center transition-all duration-300"
            >
              Booking <FaChevronDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-gray-700 mt-2 rounded shadow-lg">
                {bookingItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href === "#pesawat" ? "/flight" : "/hotel"} // Menggunakan Link dan menambahkan path yang sesuai
                    className="block px-4 py-2 text-white hover:bg-blue-500 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Button Login dan Register di Desktop */}
        <div className="hidden md:flex space-x-4">
          {/* Menggunakan Link untuk navigasi */}
          <Link
            to="/login"
            className="text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white drop-shadow-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/register" // Halaman Register
            className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 drop-shadow-lg transition-all duration-300 hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 hover:backdrop-blur-sm"
          >
            Register
          </Link>
        </div>

        {/* Icon Hamburger untuk mobile */}
        <div className="md:hidden cursor-pointer z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl focus:outline-none mt-3"
          >
            {isMenuOpen ? <FaTimes /> : <HiBars3BottomRight />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-0 rounded-xl bg-black bg-opacity-50 backdrop-blur-sm z-40 pt-5 gap-y-8 cursor-pointer max-h-screen overflow-y-auto m-3">
          <div className="max-w-screen-sm mx-auto rounded-lg p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-white hover:text-[26px] transition-all duration-300 relative after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-[-2px] after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Dropdown Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="block w-full text-left px-4 py-2 text-white hover:text-[28px] focus:outline-none transition-all duration-300"
              >
                Booking <FaChevronDown className="inline ml-2" />
              </button>
              {isDropdownOpen && (
                <div>
                  {bookingItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href === "#pesawat" ? "/flight" : "/hotel"} // Menggunakan Link dengan path yang sesuai
                      className="block px-8 py-2 text-white transition-all duration-300 relative after:content-[''] after:absolute after:left-8 after:right-8 after:bottom-[-2px] after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-2 mt-4 px-4 pb-4">
              <Link
                to="/login"
                className="w-full text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white drop-shadow-lg transition-all duration-300 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-white bg-blue-500 px-4 py-1 rounded drop-shadow-lg transition-all duration-300 hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 hover:backdrop-blur-sm text-center"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
