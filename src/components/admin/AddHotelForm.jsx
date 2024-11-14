import React, { useState } from "react";
import { FaHotel } from "react-icons/fa";

const AddHotel = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    location: "",
    rating: "",
    reviews: "",
    price: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Implement your form submission logic here
    setTimeout(() => {
      setLoading(false);
      setMessage("Hotel added successfully!");
      setIsSuccess(true);
      // Reset form after submission
      setFormData({
        hotelName: "",
        location: "",
        rating: "",
        reviews: "",
        price: "",
        image: null,
      });
    }, 2000); // Simulating an async operation
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <FaHotel className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">ADD NEW HOTEL</h1>
      </div>

      {message && (
        <p className={`mb-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Hotel Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Hotel Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              accept="image/*"
              required
            />
          </div>

          {/* Hotel Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Hotel Name</label>
            <input
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Price per Night */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="1"
              max="5"
              step="0.1"
              required
            />
          </div>

          {/* Reviews */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Reviews</label>
            <input
              type="number"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center mt-4"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            "Add Hotel"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
