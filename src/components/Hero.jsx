import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import BackgroundImage from "../assets/Home.jpg"; // Pastikan path gambar benar

const Hero = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      id="home"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

      {/* Navbar */}
      <Navbar />

      {/* Home Section */}
      <Home />
    </div>
  );
};

export default Hero;
