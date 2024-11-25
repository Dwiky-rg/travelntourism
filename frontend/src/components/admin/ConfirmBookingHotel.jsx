import React, { useState, useEffect } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

// Assuming the API URL is defined correctly
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ConfirmBookingHotel = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking data from /hotel/booking/index/admin endpoint
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/hotel/booking/index/admin`);
        if (!response.ok) {
          throw new Error("Failed to fetch booking data");
        }
        const data = await response.json();

        // Mapping the data to match the BookingHotel model
        const bookingsData = data.map((booking, index) => ({
          nomor: index + 1, // Automatically generate number for each entry
          id: booking.id,
          user: booking.user.name, // Assuming the 'user' field exists
          hotel: booking.hotel.name, // Assuming the 'hotel' field has a name
          rooms: booking.rooms,
          checkInDate: new Date(booking.checkInDate).toLocaleDateString(),
          checkOutDate: new Date(booking.checkOutDate).toLocaleDateString(),
          amount: booking.totalPrice,
          status: booking.payment ? booking.payment.status : "proses", // Assuming payment status is part of the payment relation
        }));

        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <RiMoneyDollarCircleFill className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Booking Management</h1>
      </div>
      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Booking Data</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Hotel</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Rooms</th>
              <th className="px-4 py-2 text-left">Check-In</th>
              <th className="px-4 py-2 text-left">Check-Out</th>
              <th className="px-4 py-2 text-left">Total Price</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="px-4 py-2 text-white">{booking.nomor}</td>
                <td className="px-4 py-2 text-white">{booking.hotel}</td>
                <td className="px-4 py-2 text-white">{booking.user}</td>
                <td className="px-4 py-2 text-white">{booking.rooms}</td>
                <td className="px-4 py-2 text-white">{booking.checkInDate}</td>
                <td className="px-4 py-2 text-white">{booking.checkOutDate}</td>
                <td className="px-4 py-2 text-white">Rp {booking.amount.toLocaleString()}</td>
                <td
                  className={`px-4 py-2 text-white text-center ${
                    booking.status === "terima" ? "bg-green-500 rounded-md text-white" : booking.status === "proses" ? "bg-yellow-500 rounded-md text-white" : booking.status === "ditolak" ? "bg-red-500 rounded-md text-white" : ""
                  }`}
                >
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmBookingHotel;
