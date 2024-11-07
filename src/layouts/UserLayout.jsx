import React from "react";
import Hero from "../components/Hero";
import Destination from "../components/Destination";
import Navbar from "../components/Navbar";
import Home from "../components/Home";

const UserLayout = () => {
  return (
    <div>
      <Home />
      <Navbar />
      <Destination /> {/* Destination Section */}
    </div>
  );
};

export default UserLayout;
