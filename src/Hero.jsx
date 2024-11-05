import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import BackgroundImage from "../src/assets/Home.jpg"; // Pastikan path gambar benar

const Hero = () => {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      id="home"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Navbar */}
      <Navbar />

      {/* Home Section */}
      <Home />
    </div>
  );
};

export default Hero;
