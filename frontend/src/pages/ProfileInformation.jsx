import React, { useState, useEffect } from "react";
import { FaHome, FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa"; // Added eye icons
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProfileInformation = () => {
  const [profile, setProfile] = useState({
    name: "",
    birthday: "",
    phone: "",
    gender: "",
    country: "",
    email: "",
    password: "", // Removed confirmPassword
  });

  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  };

  const navigate = useNavigate();

  // Get user profile data from the API
  const getUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userData = await response.json();
      setProfile({
        name: userData.name,
        birthday: formatDate(userData.birthday),
        phone: userData.phone,
        gender: userData.gender,
        country: userData.country,
        email: userData.email,
        password: "", // No confirmPassword anymore
      });

      setProfileImage(
        userData.image
          ? `/images-users/${userData.image}`
          : "/default-avatar.png"
      );
    } catch (error) {
      console.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(file);
      setProfileImage(imageURL);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      if (profile.name) formData.append("name", profile.name);
      if (profile.email) formData.append("email", profile.email);
      if (profile.phone) formData.append("phone", profile.phone);
      if (profile.gender) formData.append("gender", profile.gender);
      if (profile.birthday) formData.append("birthday", profile.birthday);
      if (profile.country) formData.append("country", profile.country);
      if (profile.password) formData.append("password", profile.password); // Only password, no confirmPassword
      if (selectedImage) formData.append("image", selectedImage);

      const response = await fetch("http://localhost:5000/users/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui profil");
      }

      Swal.fire({
        title: "Berhasil!",
        text: "Profil berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setProfile({
        ...profile,
        password: "", // Reset password after saving
      });
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: "Terjadi Kesalahan!",
        text: error.message || "Gagal memperbarui profil",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6 mt-20">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center relative">
        <button
          onClick={handleBackClick}
          className="absolute top-4 left-4 text-2xl text-[#21409A] rounded-full"
        >
          <FaHome />
        </button>
        <h2 className="text-2xl font-bold mb-6 mt-7">My Profile</h2>
        <div className="relative">
          <img
            src={profileImage}
            alt=""
            className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4 object-cover"
          />
          <label
            htmlFor="profileImage"
            className="absolute bottom-4 right-2 bg-[#21409A] text-white border border-white rounded-full p-2 cursor-pointer"
          >
            <FaPencilAlt />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <h2 className="text-lg font-semibold">{profile.name}</h2>
      </div>

      {/* Personal Information */}
      <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 ml-6">
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        <div className="space-y-4">
          {["name", "email", "phone", "gender", "birthday", "country"].map(
            (field) => (
              <div key={field}>
                <label className="block text-gray-600">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "birthday" ? "date" : "text"}
                  name={field}
                  value={
                    field === "birthday"
                      ? profile.birthday
                        ? profile.birthday.split("T")[0]
                        : ""
                      : profile[field]
                  }
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            )
          )}

          {/* Input for Password */}
          <div className="relative">
            <label className="block text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={profile.password || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          className="mt-6 bg-[#21409A] text-white px-24 py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileInformation;
