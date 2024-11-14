import React, { useState, useEffect } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import Logo from "../assets/indonesianature.png";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  // Efek blur saat scroll atau berpindah halaman
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

  const navItems = [
    { name: "Home", href: "home" },
    { name: "Destination", href: "destination" },
    { name: "Experience", href: "experience" },
  ];

  const bookingItems = [
    { name: "Pesawat", path: "/flight" },
    { name: "Hotel", path: "/hotel" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-50 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo di kiri */}
        <div>
          <img src={Logo} alt="Logo indonesianature" className="w-40 h-7" />
        </div>

        {/* Menu Desktop di tengah */}
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
                    to={item.path}
                    className="block px-4 py-2 text-white hover:bg-blue-500 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* UserProfile di kanan */}
        <div className="hidden md:block">
          <UserProfile />
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
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block px-4 py-2 text-white hover:text-[26px] transition-all duration-300"
              >
                {item.name}
              </button>
            ))}
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
                      to={item.path}
                      className="block px-8 py-2 text-white transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <UserProfile isMobile /> {/* Untuk tampilan mobile */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
