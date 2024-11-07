import React from "react";
import Destination from "../components/Destination";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Experience from "../components/Experience";

const UserLayout = () => {
  return (
    <div>
      <Home />
      <Navbar />
      <Destination />
      <Experience />
    </div>
  );
};

export default UserLayout;
