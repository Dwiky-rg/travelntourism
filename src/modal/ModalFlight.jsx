import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const ModalFlight = ({ selectedFlight, onClose }) => {
  const [passengerCount, setPassengerCount] = useState(1);

  // Fungsi untuk menambah atau mengurangi jumlah penumpang
  const handlePassengerChange = (change) => {
    setPassengerCount((prevCount) => Math.max(1, prevCount + change));
  };

  // Fungsi untuk menghitung harga total menggunakan calculateTotalPrice
  const calculateTotalPrice = () => {
    if (!selectedFlight) return 0;

    // Ubah harga dari format string ke angka
    const priceNumber = parseInt(
      selectedFlight.price.replace(/\./g, "").replace("/pax", ""),
      10
    );
    return priceNumber * passengerCount;
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedFlight.airline} - {selectedFlight.classType}
          </h2>
          <FaTimes
            className="cursor-pointer text-2xl hover:text-red-500 transition duration-300"
            onClick={onClose}
          />
        </div>

        {/* Flight Details */}
        <div className="flex items-center mb-4">
          <img
            src={selectedFlight.logo}
            alt="Airline Logo"
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div>
            <p className="text-lg font-semibold">
              {selectedFlight.from}
              <FaArrowRightLong className="inline mx-2" />
              {selectedFlight.to}
            </p>
            <p className="text-sm text-gray-500">{selectedFlight.date}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-800">Departure:</span>{" "}
            {selectedFlight.departure}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-800">Arrival:</span>{" "}
            {selectedFlight.arrival}
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-2">
            Price: <span className="text-blue-600">{selectedFlight.price}</span>
          </p>
        </div>

        {/* Passenger Selector */}
        <div className="flex items-center justify-center my-4">
          <button
            onClick={() => handlePassengerChange(-1)}
            disabled={passengerCount <= 1}
          >
            <FiMinusCircle className="text-3xl" />
          </button>
          <span className="mx-3 text-lg font-semibold text-gray-700">
            {passengerCount}
          </span>
          <button onClick={() => handlePassengerChange(1)}>
            <FiPlusCircle className="text-3xl" />
          </button>
        </div>

        {/* Total Price */}
        <p className="text-lg font-bold text-gray-800 text-center mt-4">
          Total Price:{" "}
          <span className="text-blue-600">
            IDR {calculateTotalPrice().toLocaleString()}
          </span>
        </p>

        {/* Confirm Button */}
        <button
          className="mt-6 w-full text-white py-3 rounded-lg font-semibold text-lg bg-blue-500 hover:bg-blue-600 transition duration-300"
          onClick={onClose}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default ModalFlight;
