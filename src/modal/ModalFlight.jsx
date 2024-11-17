import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import ModalPayment from "./ModalPayment";
import ModalSuccess from "./ModalSuccess";
import Invoice from "./Invoice";

const ModalFlight = ({ selectedFlight, onClose }) => {
  const [passengerCount, setPassengerCount] = useState(1);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const handlePassengerChange = (change) => {
    setPassengerCount((prevCount) => Math.max(1, prevCount + change));
  };

  const calculateTotalPrice = () => {
    if (!selectedFlight) return 0;
    const priceNumber = parseInt(
      selectedFlight.price.replace(/\./g, "").replace("/pax", ""),
      10
    );
    return priceNumber * passengerCount;
  };

  const handlePaymentModalOpen = () => {
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false); // Tutup modal pembayaran
    setSuccessModalOpen(true); // Tampilkan modal sukses
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const handleShowInvoice = () => {
    setSuccessModalOpen(false); // Menutup modal sukses
    setInvoiceModalOpen(true); // Menampilkan modal invoice
  };

  const handleCloseInvoiceModal = () => {
    setInvoiceModalOpen(false); // Tutup modal invoice
    onClose(); // Tutup semua modal
  };

  return (
    <>
      {!isPaymentModalOpen && !isSuccessModalOpen && !isInvoiceModalOpen && (
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
                Price:{" "}
                <span className="text-blue-600">{selectedFlight.price}</span>
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
              onClick={handlePaymentModalOpen}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <ModalPayment
          totalPrice={calculateTotalPrice()}
          onClose={handleClosePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Modal Sukses */}
      {isSuccessModalOpen && (
        <ModalSuccess
          onClose={handleCloseSuccessModal}
          onShowInvoice={handleShowInvoice} // Pastikan onShowInvoice diteruskan ke ModalSuccess
        />
      )}

      {/* Modal Invoice */}
      {isInvoiceModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseInvoiceModal} // Menutup modal invoice jika klik di luar
        >
          <div
            className="relative rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Menghentikan propagasi klik di dalam modal
          >
            <Invoice
              type="flight"
              data={{
                airline: selectedFlight.airline,
                price: calculateTotalPrice(),
                departure: selectedFlight.departure,
                arrival: selectedFlight.arrival,
                date: selectedFlight.date,
                from: selectedFlight.from,
                to: selectedFlight.to,
                logo: selectedFlight.logo,
                classType: selectedFlight.classType,
              }}
              onClose={onClose} // Fungsi untuk menutup modal invoice
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalFlight;
