import React from "react";
import Navbar from "../components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
