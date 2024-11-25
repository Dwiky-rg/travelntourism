// src/pages/NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen p-6">
      <div className="rounded-lg p-10 w-full text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-6">404</h1>
        <p className="text-2xl text-gray-800 mb-8">Oops, halaman yang Anda cari tidak ditemukan!</p>
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Kembali ke Halaman Sebelumnya
        </button>
      </div>
    </div>
  );
};

export default NotFound;
