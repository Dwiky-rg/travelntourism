import React from "react";
import Destination from "../components/Destination"; // Import Destination Section
import Home from "../components/Home";
import Experience from "../components/Experience";
import About from "../components/About";
import Faq from "../components/Faq";

const UserDashboard = () => {
  return (
    <>
      <Home />
      <About />
      <Destination />
      <Experience />
      <Faq />
    </>
  );
};

export default UserDashboard;
