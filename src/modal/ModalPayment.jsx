import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import bcalogo from "../assets/BCA.png";

const ModalPayment = ({ totalPrice, onClose, onPaymentSuccess }) => {
  const [file, setFile] = useState(null); // State untuk menyimpan file
  const [error, setError] = useState(""); // State untuk pesan kesalahan

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Simpan file yang diunggah
    setError(""); // Hapus pesan kesalahan jika ada
  };

  const handleConfirmPayment = () => {
    if (!file) {
      setError("Please upload the payment proof before confirming."); // Validasi file
      return;
    }
    // Simulasikan proses pembayaran berhasil
    onPaymentSuccess();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
          <FaTimes
            className="cursor-pointer text-2xl hover:text-red-500 transition duration-300"
            onClick={onClose}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Payment Proof
          </label>
          <input
            type="file"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFileChange}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <p className="text-gray-700 font-semibold">Payment Destination:</p>
          <div className="mb-4 flex items-center">
            <img src={bcalogo} alt="BCA Logo" className="w-10 h-7 mr-1" />
            <p className="text-gray-600">Bank BCA - 1234567890</p>
          </div>
        </div>

        <p className="text-lg font-bold text-gray-800 text-center mt-4">
          Total Price:{" "}
          <span className="text-blue-600">
            IDR {totalPrice.toLocaleString()}
          </span>
        </p>

        <button
          className="mt-6 w-full text-white py-3 rounded-lg font-semibold text-lg bg-blue-500 hover:bg-blue-600 transition duration-300"
          onClick={handleConfirmPayment}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default ModalPayment;
