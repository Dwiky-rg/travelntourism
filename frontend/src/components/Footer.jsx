import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram, FaSquareYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-transparent text-black px-12 py-6 relative bottom-0 left-0 w-full">
      <div className="text-center space-y-6">
        <div className="flex justify-center space-x-6">
          <a
            href="#home"
            className="hover:text-blue-500 transition-all duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-blue-500 transition-all duration-300"
          >
            About Us
          </a>
          <a
            href="#destination"
            className="hover:text-blue-500 transition-all duration-300"
          >
            Destination
          </a>
          <a
            href="#experience"
            className="hover:text-blue-500 transition-all duration-300"
          >
            Experience
          </a>
          <a
            href="#faq"
            className="hover:text-blue-500 transition-all duration-300"
          >
            FAQs
          </a>
        </div>

        <div className="flex justify-between items-center">
          {/* Phone (Kiri) */}
          <span className="flex-1 text-left">Phone: +1-123-456-7890</span>

          {/* Icon (Tengah) */}
          <div className="flex-1 flex justify-center space-x-6 items-center text-[22px]">
            <a
              href="https://www.facebook.com"
              target="blank"
              className="hover:scale-110 transition-transform duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="blank"
              className="hover:scale-110 transition-transform duration-300"
            >
              <FaSquareInstagram />
            </a>
            <a
              href="https://www.youtube.com"
              target="blank"
              className="hover:scale-110 transition-transform duration-300"
            >
              <FaSquareYoutube />
            </a>
          </div>

          {/* Email (Kanan) */}
          <span className="flex-1 text-right">
            Email: indonesianature@gmail.com
          </span>
        </div>
        <div className="text-center">
          <span>Copyright © [2024] Indonesianature. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
