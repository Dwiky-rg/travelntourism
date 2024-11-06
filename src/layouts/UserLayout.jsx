import React from "react";
import Hero from "../components/Hero";
import Destination from "../components/Destination";

const UserLayout = () => {
  return (
    <div>
      <Hero /> {/* Hero Section */}
      <Destination /> {/* Destination Section */}
    </div>
  );
};

export default UserLayout;
