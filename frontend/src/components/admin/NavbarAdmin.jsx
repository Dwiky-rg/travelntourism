import React from "react";

function NavbarAdmin() {
  return (
    <nav className="bg-[#252525] text-white px-4 py-2 flex justify-between items-center sticky top-5 z-10 rounded-lg shadow-lg w-full ">
      <h1 className="text-xl font-semibold font-poppins">Dashboard</h1>
      <div>
        <button className="px-4 py-2 bg-gray-700 rounded">Profile</button>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
