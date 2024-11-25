import React, { useState } from "react";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import LoginRegister from "../assets/LoginRegister.jpg";
import Logo from "../assets/indonesianature.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormErrors({ ...formErrors, [`${id}Error`]: "" }); // Reset error when user types
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.nameError = "Nama tidak boleh kosong";
    if (!formData.email) errors.emailError = "Email atau Nomor HP tidak boleh kosong";
    if (!formData.phone) errors.phoneError = "Nomor HP tidak boleh kosong";
    if (!formData.password) errors.passwordError = "Password tidak boleh kosong";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPasswordError = "Password dan Konfirmasi Password tidak cocok!";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors); // Set the validation errors

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setSuccess("Akun berhasil dibuat! Silakan login.");
      setError("");
      setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan!");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with background image */}
      <div className="w-1/2 bg-cover bg-center flex flex-col items-center justify-start p-8" style={{ backgroundImage: `url(${LoginRegister})` }}>
        <div className="flex justify-center items-center w-full">
          <img src={Logo} alt="Website Logo" className="w-72 h-auto" />
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-10 ml-5 self-start">Register</h2>

          {/* Display success or error messages */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input id="name" type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Name" value={formData.name} onChange={handleChange} />
              {formErrors.nameError && <p className="text-red-500 text-sm">{formErrors.nameError}</p>}
            </div>
            <div className="mb-4">
              <input id="email" type="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Nomor HP atau Email" value={formData.email} onChange={handleChange} />
              {formErrors.emailError && <p className="text-red-500 text-sm">{formErrors.emailError}</p>}
            </div>
            <div className="mb-4">
              <input id="phone" type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              {formErrors.phoneError && <p className="text-red-500 text-sm">{formErrors.phoneError}</p>}
            </div>
            <div className="mb-6">
              <input id="password" type="password" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Password" value={formData.password} onChange={handleChange} />
              {formErrors.passwordError && <p className="text-red-500 text-sm">{formErrors.passwordError}</p>}
            </div>
            <div className="mb-6">
              <input id="confirmPassword" type="password" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
              {formErrors.confirmPasswordError && <p className="text-red-500 text-sm">{formErrors.confirmPasswordError}</p>}
            </div>
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-500 font-semibold hover:underline">
              Login yuk!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
