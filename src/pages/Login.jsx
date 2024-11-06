// src/pages/Login.jsx
import React from "react";

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
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
    </div>
  </div>
);

export default Login;
