import React from "react";
import { FaTimes } from "react-icons/fa";
import jsPDF from "jspdf";

const Invoice = ({ type, data, onClose }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    if (type === "hotel") {
      // Hotel Invoice
      doc.setFontSize(24);
      doc.text("Hotel Booking Invoice", 105, 20, { align: "center" });

      // Garis pemisah
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);

      // Konten
      doc.setFontSize(14);
      doc.text(`Hotel Name: ${data.hotelName}`, 20, 40);
      doc.text(`Location: ${data.location}`, 20, 50);
      doc.text(`Room Type: ${data.roomType}`, 20, 60);
      doc.text(`Number of Nights: ${data.numNights}`, 20, 70);
      doc.text(`Total Price: IDR ${data.totalPrice.toLocaleString()}`, 20, 80);
    } else if (type === "flight") {
      // Flight Invoice
      doc.setFontSize(24);
      doc.text("Flight Booking Invoice", 105, 20, { align: "center" });

      // Garis pemisah
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);

      doc.setFontSize(14);
      doc.text(`Airline: ${data.airline}`, 20, 40);
      doc.text(`Class Type: ${data.classType}`, 20, 50);
      doc.text(`From: ${data.from}`, 20, 60);
      doc.text(`To: ${data.to}`, 20, 70);
      doc.text(`Date: ${data.date}`, 20, 80);
      doc.text(`Departure: ${data.departure}`, 20, 90);
      doc.text(`Arrival: ${data.arrival}`, 20, 100);
      doc.text(`Total Price: IDR ${data.price.toLocaleString()}`, 20, 110);
    }

    doc.setLineWidth(0.2);
    doc.line(20, 140, 190, 140); // Garis atas footer
    doc.setFontSize(10);
    doc.text("Thank you for booking with indonesianature!", 105, 150, {
      align: "center",
    });

    // Unduh PDF
    doc.save(`${type}-invoice.pdf`);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
      {/* Tombol Close di pojok kanan atas */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300"
      >
        <FaTimes className="text-2xl" />
      </button>

      {/* Konten Modal */}
      <h2 className="text-2xl font-bold mb-4">
        {type === "hotel" ? "Hotel Invoice" : "Flight Invoice"}
      </h2>
      <div className="text-left">
        {type === "hotel" && (
          <>
            <p>
              <strong>Hotel Name:</strong> {data.hotelName}
            </p>
            <p>
              <strong>Location:</strong> {data.location}
            </p>
            <p>
              <strong>Room Type:</strong> {data.roomType}
            </p>
            <p>
              <strong>Number of Nights:</strong> {data.numNights}
            </p>
            <p>
              <strong>Total Price:</strong> IDR{" "}
              {data.totalPrice.toLocaleString()}
            </p>
          </>
        )}
        {type === "flight" && (
          <>
            <p>
              <strong>Airline:</strong> {data.airline}
            </p>
            <p>
              <strong>Class Type:</strong> {data.classType}
            </p>
            <p>
              <strong>From:</strong> {data.from}
            </p>
            <p>
              <strong>To:</strong> {data.to}
            </p>
            <p>
              <strong>Date:</strong> {data.date}
            </p>
            <p>
              <strong>Departure:</strong> {data.departure}
            </p>
            <p>
              <strong>Arrival:</strong> {data.arrival}
            </p>
            <p>
              <strong>Total Price:</strong> IDR {data.price.toLocaleString()}
            </p>
          </>
        )}
      </div>
      <button
        onClick={generatePDF}
        className="mt-6 px-6 py-3 text-white rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
