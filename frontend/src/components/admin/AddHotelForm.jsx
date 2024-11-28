import React, { useState, useEffect } from "react";
import { FaHotel } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

const AddHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hotelData, setHotelData] = useState({
    id: null,
    name: "",
    location: "",
    price: "",
    image: null,
    currentImage: null, // Store current image URL for editing
  });
  const [imagePreview, setImagePreview] = useState(null); // Store image preview
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch hotel data from API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${API_URL}/hotel`);
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [API_URL]);

  // Open Add or Edit Modal
  const openModal = (hotel = null) => {
    if (hotel) {
      setIsEditing(true);
      setHotelData({
        id: hotel.id,
        name: hotel.name,
        location: hotel.location,
        price: hotel.price,
        rating: hotel.rating,
        currentImage: hotel.image, // Set current image for editing
      });
      setImagePreview(hotel.image); // Display current image in preview
    } else {
      setIsEditing(false);
      setHotelData({
        id: null,
        name: "",
        location: "",
        price: "",
        rating: "",
        image: null,
        currentImage: null,
      });
      setImagePreview(null); // Reset image preview
    }
    setModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", hotelData.name);
      formData.append("location", hotelData.location);
      formData.append("price", hotelData.price);
      formData.append("rating", hotelData.rating);
      if (hotelData.image) formData.append("image", hotelData.image);

      if (isEditing) {
        // Update hotel
        await axios.put(`${API_URL}/hotel/${hotelData.id}`, formData);
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Hotel",
          text: "Data hotel berhasil diperbarui.",
        });
      } else {
        // Add new hotel
        await axios.post(`${API_URL}/hotel/add`, formData);
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Hotel",
          text: "Hotel baru berhasil ditambahkan.",
        });
      }

      // Refresh hotel list
      const response = await axios.get(`${API_URL}/hotel`);
      setHotels(response.data);
      closeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal menambahkan atau mengedit hotel.",
      });
      console.error("Error submitting form:", error);
    }
  };

  // Delete Hotel
  const handleDelete = async (id) => {
    // Step 1: Show confirmation dialog
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi Penghapusan",
      text: "Apakah Anda yakin ingin menghapus hotel ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Tidak",
      reverseButtons: true, // To reverse the button order (Yes first)
    });

    // Step 2: Proceed with delete if the user confirms
    if (result.isConfirmed) {
      try {
        // Delete hotel from the API
        await axios.delete(`${API_URL}/hotel/${id}`);

        // Update the state to reflect the deletion
        setHotels(hotels.filter((hotel) => hotel.id !== id));

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Berhasil Menghapus Hotel",
          text: "Hotel telah dihapus.",
        });
      } catch (error) {
        // Show error message if the deletion fails
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: "Gagal menghapus hotel.",
        });
        console.error("Error deleting hotel:", error);
      }
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setHotelData({ ...hotelData, image: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Update image preview
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <FaHotel className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Hotel Management</h1>
      </div>

      {/* Add New Hotel Button */}
      <button
        onClick={() => openModal()}
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4"
      >
        Add New Hotel
      </button>

      {/* Hotel Data Table */}
      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Hotel Data</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">Hotel Name</th>
              <th className="px-4 py-2">Hotel Image</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <tr key={hotel.id} className="border-b text-white">
                  <td className="px-4 py-2">{hotel.name}</td>
                  <td className="px-4 py-2">
                    <img
                      src={`/images-hotels/${hotel.image}`}
                      alt="logo"
                      className="w-8 h-8 object-contain "
                    />
                  </td>
                  <td className="px-4 py-2">{hotel.location}</td>
                  <td className="px-4 py-2">{formatPrice(hotel.price)}</td>
                  <td className="px-4 py-2">{hotel.rating}</td>
                  <td cclassName="p-4 text-center flex">
                    <button
                      onClick={() => openModal(hotel)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hotel.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-white p-4">
                  No hotels available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-2/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {isEditing ? "Edit Hotel" : "Add New Hotel"}
              </h2>
              <button onClick={closeModal} className="text-xl font-bold">
                &times;
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Hotel Image Preview */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Hotel Image
                  </label>
                  <input
                    type="file"
                    className="w-full p-2 border rounded"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {/* Show image preview */}
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </div>
                  )}
                  {/* Show current image if editing */}
                  {isEditing && hotelData.currentImage && !imagePreview && (
                    <div className="mt-4">
                      <img
                        src={hotelData.currentImage}
                        alt="Current Image"
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>

                {/* Hotel Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Hotel Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={hotelData.name}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, name: e.target.value })
                    }
                  />
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={hotelData.location}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, location: e.target.value })
                    }
                  />
                </div>

                {/* Price */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Price</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={hotelData.price}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, price: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Rating
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={hotelData.rating}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, rating: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHotel;
