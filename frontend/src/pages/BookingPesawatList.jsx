import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const BookingPesawatList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/pesawat/bookings/index/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Menambahkan informasi pesawat ke dalam setiap booking
        const bookingsWithAirline = response.data.map((booking) => ({
          ...booking,
          airline: booking.jadwal?.pesawat?.airline || "N/A", // Menambahkan airline ke setiap booking
        }));

        setBookings(bookingsWithAirline); // Mengupdate state dengan data yang sudah diproses
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewDetails = async (bookingId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://localhost:5000/pesawat/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const booking = response.data;

      // Ensure jadwal.pesawat is defined
      const airlineName = booking.jadwal?.pesawat?.airline || "N/A";

      const doc = new jsPDF();

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Flight Booking Details", 105, 20, { align: "center" });

      doc.line(20, 25, 190, 25);

      // Booking details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      doc.text(`Airline: ${airlineName}`, 20, 40);
      doc.text(`Origin: ${booking.jadwal.origin}`, 20, 50);
      doc.text(`Destination: ${booking.jadwal.destination}`, 20, 60);
      doc.text(`Flight Date: ${new Date(booking.jadwal.flightDate).toLocaleDateString()}`, 20, 70);
      doc.text(`Departure Time: ${booking.jadwal.departureTime}`, 20, 80);
      doc.text(`Arrival Time: ${booking.jadwal.arrivalTime}`, 20, 90);
      doc.text(`Class: ${booking.jadwal.class}`, 20, 100);
      doc.text(`Total Price: ${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(booking.totalPrice)}`, 20, 110);

      doc.setFont("helvetica", "bold");
      doc.text("Passenger Details:", 20, 130);

      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${booking.name}`, 20, 140);
      doc.text(`Gender: ${booking.gender}`, 20, 150);
      doc.text(`Country: ${booking.country}`, 20, 160);
      doc.text(`Birthday: ${new Date(booking.birthday).toLocaleDateString()}`, 20, 170);

      doc.setFont("helvetica", "bold");
      doc.text("Payment Details:", 20, 190);

      doc.setFont("helvetica", "normal");
      doc.text(`Status: ${booking.payment?.status || "N/A"}`, 20, 200);
      doc.text(`Payment Date: ${booking.payment?.paymentDate ? new Date(booking.payment.paymentDate).toLocaleDateString() : "N/A"}`, 20, 210);
      doc.text(`Bank: ${booking.payment?.bank || "N/A"}`, 20, 220);

      doc.setFontSize(10);
      doc.text("Thank you for booking with us! For any issues, contact support.", 105, 270, { align: "center" });

      doc.save(`BookingPesawat_${bookingId}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">My Flight Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border-b">Airline</th>
                <th className="text-left px-4 py-2 border-b">Origin</th>
                <th className="text-left px-4 py-2 border-b">Destination</th>
                <th className="text-left px-4 py-2 border-b">Flight Date</th>
                <th className="text-left px-4 py-2 border-b">Departure</th>
                <th className="text-left px-4 py-2 border-b">Arrival</th>
                <th className="text-left px-4 py-2 border-b">Status</th>
                <th className="text-left px-4 py-2 border-b">Total Price</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{booking.jadwal.pesawat.airline}</td>
                  <td className="px-4 py-2 border-b">{booking.jadwal.origin}</td>
                  <td className="px-4 py-2 border-b">{booking.jadwal.destination}</td>
                  <td className="px-4 py-2 border-b">{new Date(booking.jadwal.flightDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{booking.jadwal.departureTime}</td>
                  <td className="px-4 py-2 border-b">{booking.jadwal.arrivalTime}</td>
                  <td className="px-4 py-2 border-b">{booking.payment.status}</td>
                  <td className="px-4 py-2 border-b">{Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(booking.totalPrice)}</td>
                  <td className="px-4 py-2 border-b text-center">
                    {booking.payment.status === "terima" ? (
                      <button onClick={() => handleViewDetails(booking.id)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
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
    </div>
  );
};

export default BookingPesawatList;
