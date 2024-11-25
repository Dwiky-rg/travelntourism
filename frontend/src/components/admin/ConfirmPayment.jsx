import React, { useState, useEffect } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

// Assuming the API URL is defined correctly
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ConfirmPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch payment data based on the BookingPesawat, JadwalPenerbangan, and PaymentPesawat models
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${API_URL}/pesawat/bookings/index`);
        if (!response.ok) {
          throw new Error("Failed to fetch booking data");
        }
        const data = await response.json();

        // Mapping the data to match the structure from the models
        const paymentsData = data.map((booking, index) => ({
          nomor: index + 1, // Automatically generate number for each entry
          id: booking.id,
          user: booking.user.name, // Assuming the 'user' field exists
          amount: booking.totalPrice,
          status: booking.payment ? booking.payment.status : "Unpaid", // Assuming payment status is part of the payment relation
          pesawatId: booking.jadwal.pesawatId, // Extract pesawatId from jadwal.pesawat
          jadwal: booking.jadwal.destination + " - " + booking.jadwal.origin, // Destination and origin from JadwalPenerbangan
          flightDate: new Date(booking.jadwal.flightDate).toLocaleDateString(), // Flight date formatting
          departureTime: booking.jadwal.departureTime,
          arrivalTime: booking.jadwal.arrivalTime,
        }));

        setPayments(paymentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
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
              <th className="px-4 py-2 text-left">Pesawat ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Flight</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Departure</th>
              <th className="px-4 py-2 text-left">Arrival</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="px-4 py-2 text-white">{payment.nomor}</td>
                <td className="px-4 py-2 text-white text-center">{payment.pesawatId}</td>
                <td className="px-4 py-2 text-white">{payment.user}</td>
                <td className="px-4 py-2 text-white">{payment.jadwal}</td>
                <td className="px-4 py-2 text-white">Rp {payment.amount.toLocaleString()}</td>
                <td className="px-4 py-2 text-white">{payment.departureTime}</td>
                <td className="px-4 py-2 text-white">{payment.arrivalTime}</td>
                <td
                  className={`px-4 py-2 text-white text-center ${
                    payment.status === "terima" ? "bg-green-500 rounded-md text-white" : payment.status === "proses" ? "bg-yellow-500 rounded-md text-white" : payment.status === "ditolak" ? "bg-red-500 rounded-md text-white" : ""
                  }`}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmPayment;
