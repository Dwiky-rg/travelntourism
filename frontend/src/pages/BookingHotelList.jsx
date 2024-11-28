import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const BookingHotelList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:5000/hotel/booking/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to fetch booking details and generate PDF
  const handleViewDetails = async (bookingId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:5000/hotel/booking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const booking = response.data;

      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Hotel Booking Details", 105, 20, { align: "center" });

      // Horizontal line
      doc.setDrawColor(0, 0, 0);
      doc.line(20, 25, 190, 25);

      // Booking details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      doc.text(`User Name: ${booking.user.name}`, 20, 30);
      doc.text(`Hotel Name: ${booking.hotel.name}`, 20, 40);
      doc.text(`Location: ${booking.hotel.location}`, 20, 50);
      doc.text(
        `Check-in Date: ${new Date(booking.checkInDate).toLocaleDateString()}`,
        20,
        60
      );
      doc.text(
        `Check-out Date: ${new Date(
          booking.checkOutDate
        ).toLocaleDateString()}`,
        20,
        70
      );
      doc.text(`Rooms: ${booking.rooms}`, 20, 80);
      doc.text(
        `Total Price: ${Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(booking.totalPrice)}`,
        20,
        90
      );

      // Payment details
      doc.setFont("helvetica", "bold");
      doc.text("Payment Details:", 20, 110);

      doc.setFont("helvetica", "normal");
      doc.text(`Status: ${booking.payment?.status || "N/A"}`, 20, 120);
      doc.text(
        `Payment Date: ${
          booking.payment?.paymentDate
            ? new Date(booking.payment.paymentDate).toLocaleDateString()
            : "N/A"
        }`,
        20,
        130
      );
      doc.text(`Bank: ${booking.payment?.bank || "N/A"}`, 20, 140);

      // Footer
      doc.setFontSize(10);
      doc.text(
        "Thank you for booking with us! For any issues, contact support.",
        105,
        270,
        { align: "center" }
      );

      // Save the PDF
      doc.save(`Booking_${bookingId}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 mt-14">
      <h1 className="text-2xl font-bold mb-4">My Hotel Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border-b">Name</th>
                <th className="text-left px-4 py-2 border-b">Hotel Name</th>
                <th className="text-left px-4 py-2 border-b">Location</th>
                <th className="text-left px-4 py-2 border-b">Check-in Date</th>
                <th className="text-left px-4 py-2 border-b">Check-out Date</th>
                <th className="text-left px-4 py-2 border-b">Rooms</th>
                <th className="text-left px-4 py-2 border-b">Status</th>
                <th className="text-left px-4 py-2 border-b">Total Price</th>
                <th className=" px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{booking.user.name}</td>
                  <td className="px-4 py-2 border-b">{booking.hotel.name}</td>
                  <td className="px-4 py-2 border-b">
                    {booking.hotel.location}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">{booking.rooms}</td>
                  <td className="px-4 py-2 border-b">
                    {booking.payment.status}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(booking.totalPrice)}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {booking.payment.status === "terima" ? (
                      <button
                        onClick={() => handleViewDetails(booking.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Download Pdf
                      </button>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default BookingHotelList;
