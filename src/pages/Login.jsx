// src/pages/Login.jsx
import React from "react";
import { FaGoogle } from "react-icons/fa";
import LoginRegister from "../assets/LoginRegister.jpg";
import Logo from "../assets/indonesianature.png";

const Login = () => (
  <div className="min-h-screen flex">
    {/* Left side with background image */}
    <div
      className="w-1/2 bg-cover bg-center flex flex-col items-center justify-start p-8"
      style={{ backgroundImage: `url(${LoginRegister})` }}
    >
      {/* Logo in the top center */}
      <div className="flex justify-center items-center w-full">
        <img src={Logo} alt="Website Logo" className="w-72 h-auto" />
      </div>
    </div>

    {/* Right side with form */}
    <div className="w-1/2 flex items-center justify-center p-8">
      <div className="w-full flex flex-col items-center">
        {/* Menggunakan self-start untuk mengatur teks ke kiri */}
        <h2 className="text-2xl font-bold mb-10 ml-5 self-start">Login</h2>
        <form className="w-full max-w-2xl">
          <div className="mb-4">
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Nomor HP atau Email"
            />
          </div>
          <div className="mb-6">
            <input
              id="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* Teks "Login lebih cepat dengan" */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Login lebih cepat dengan
        </p>

        {/* Tombol "Login dengan Google" */}
        <button
          type="button"
          className="inline-flex items-center justify-center mt-4 p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 max-w-max"
        >
          <FaGoogle className="mr-2 text-black" /> {/* Ikon Google */}
          <span className="text-black font-semibold">Sign in with Google</span>
        </button>

        {/* Teks "Belum punya akun? Daftar yuk!" */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Daftar yuk!
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Login;
