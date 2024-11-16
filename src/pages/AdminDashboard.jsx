import React from "react";
import { FaUser, FaHotel } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl text-white font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 text-white md:grid-cols-3 gap-6">
        <div className="bg-[#0d3a5c] p-6 rounded-lg flex items-center">
          <div className="mr-4">
            <FaUser className="text-6xl  bg-[#5c6bc0] p-2 rounded-xl" />
          </div>
          <div>
            <h2 className="text-lg ">Total User</h2>
            <p className="text-3xl font-bold">10,689</p>
          </div>
        </div>
        <div className="bg-[#0d3a5c] p-6 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <GiCommercialAirplane className="text-6xl  bg-[#ffca28] p-2 rounded-xl" />
          </div>
          <div>
            <h2 className="text-lg ">Total Flight</h2>
            <p className="text-3xl font-bold">6540</p>
          </div>
        </div>
        <div className="bg-[#0d3a5c] p-6 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaHotel className="text-6xl bg-[#4dd0e1] p-2 rounded-xl" />
          </div>
          <div>
            <h2 className="text-lg ">Total Hotel</h2>
            <p className="text-3xl font-bold">6540</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
