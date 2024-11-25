import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import LoginRegister from "../assets/LoginRegister.jpg";
import Logo from "../assets/indonesianature.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after login
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation after successful login
  const { login } = useAuth(); // Access the login function from AuthContext

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Log the full response for debugging
      console.log(response);

      if (response.data.token) {
        console.log("Login Successful, Token: ", response.data.token); // Log the token
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userEmail", formData.email);

        // Store the user role in localStorage
        localStorage.setItem("userRole", response.data.role); // Save the role to localStorage

        // Call the login method from AuthContext
        login(response.data.token, formData.email);

        if (response.data.role === "admin") {
          console.log("Redirecting to /admin/dashboard");
          navigate("/admin/dashboard");
        } else {
          console.log("Redirecting to /");
          navigate("/");
        }
      } else {
        // Handle login failed based on the message from backend
        setError(response.data.message || "Login failed, please check your credentials.");
      }
    } catch (err) {
      console.error(err); // Log error details for debugging
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with background image */}
      <div className="w-1/2 bg-cover bg-center flex flex-col items-center justify-start p-8" style={{ backgroundImage: `url(${LoginRegister})` }}>
        {/* Logo in the top center */}
        <div className="flex justify-center items-center w-full">
          <img src={Logo} alt="Website Logo" className="w-72 h-auto" />
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full flex flex-col items-center">
          {/* Heading */}
          <h2 className="text-2xl font-bold mb-10 ml-5 self-start">Login</h2>

          {/* Display error if any */}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input id="email" type="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder=" Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-6">
              <input id="password" type="password" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Login
            </button>
          </form>

          {/* "Belum punya akun? Daftar yuk!" */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-500 font-semibold hover:underline">
              Daftar yuk!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
