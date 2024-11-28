import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaHotel } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [hotelCount, setHotelCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );
        setUserCount(userResponse.data.length); // Assuming the response is an array of users

        // Fetch total flights
        const flightResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/jadwal-penerbangan`
        );
        setFlightCount(flightResponse.data.length); // Assuming the response is an array of flights

        // Fetch total hotels
        const hotelResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel`
        );
        setHotelCount(hotelResponse.data.length); // Assuming the response is an array of hotels
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

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
            <p className="text-3xl font-bold">{userCount}</p>
          </div>
        </div>
        <div className="bg-[#0d3a5c] p-6 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <GiCommercialAirplane className="text-6xl  bg-[#ffca28] p-2 rounded-xl" />
          </div>
          <div>
            <h2 className="text-lg ">Total Flight</h2>
            <p className="text-3xl font-bold">{flightCount}</p>
          </div>
        </div>
        <div className="bg-[#0d3a5c] p-6 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaHotel className="text-6xl bg-[#4dd0e1] p-2 rounded-xl" />
          </div>
          <div>
            <h2 className="text-lg ">Total Hotel</h2>
            <p className="text-3xl font-bold">{hotelCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
