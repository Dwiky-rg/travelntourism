import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import ikon centang

const ModalSuccess = ({ onClose, onShowInvoice }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Tutup modal jika klik di luar modal
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()} // Mencegah penutupan modal saat klik di dalam modal
      >
        {/* Ikon Centang */}
        <FaCheckCircle className="text-green-500 text-8xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-green-600">
          Payment Successful!
        </h2>
        <p className="mt-4 text-gray-700">
          Thank you for your payment. Your transaction has been successfully
          processed.
        </p>

        {/* Tombol untuk menampilkan Invoice */}
        <button
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => {
            onShowInvoice(); // Panggil fungsi untuk menampilkan invoice
          }}
        >
          Show Invoice
        </button>
      </div>
    </div>
  );
};

export default ModalSuccess;
