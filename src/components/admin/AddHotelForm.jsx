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

  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State untuk kontrol modal
  const [editingIndex, setEditingIndex] = useState(null); // Index hotel yang sedang diedit

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
    // Simulasi pengiriman data
    setTimeout(() => {
      setLoading(false);
      setMessage("Hotel added successfully!");
      setIsSuccess(true);

      // Jika sedang mengedit, update data hotel, jika tidak, tambah hotel baru
      if (editingIndex !== null) {
        const updatedHotels = [...hotels];
        updatedHotels[editingIndex] = {
          ...formData,
          image: URL.createObjectURL(formData.image), // Menampilkan gambar yang baru diupload
        };
        setHotels(updatedHotels);
        setEditingIndex(null); // Reset indeks setelah edit
      } else {
        setHotels([
          ...hotels,
          {
            ...formData,
            image: URL.createObjectURL(formData.image), // Menampilkan gambar yang baru diupload
          },
        ]);
      }

      setFormData({
        hotelName: "",
        location: "",
        rating: "",
        reviews: "",
        price: "",
        image: null,
      });
      setMessage("");
      setShowModal(false); // Menutup modal setelah submit
    }, 2000);
  };

  // Fungsi untuk mengedit data hotel
  const handleEdit = (index) => {
    const hotelToEdit = hotels[index];
    setFormData({
      ...hotelToEdit,
      image: null, // Karena file tidak bisa dipassing langsung, harus diupload ulang
    });
    setEditingIndex(index); // Set index hotel yang akan diedit
    setShowModal(true); // Tampilkan modal untuk edit
  };

  // Fungsi untuk menghapus data hotel
  const handleDelete = (index) => {
    const updatedHotels = hotels.filter((_, i) => i !== index);
    setHotels(updatedHotels); // Hapus hotel dari daftar
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <FaHotel className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Hotel Management</h1>
      </div>

      {message && (
        <p className={`mb-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      {/* Tombol Add New Hotel */}
      <button
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4"
        onClick={() => setShowModal(true)} // Menampilkan modal
      >
        Add New Hotel
      </button>

      {/* Tabel Data Hotel */}
      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Hotel Data</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2">Hotel Name</th>
              <th className="p-2">Location</th>
              <th className="p-2">Price</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Reviews</th>
              <th className="p-2">Actions</th>{" "}
              {/* Kolom untuk tombol Edit dan Hapus */}
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel, index) => (
              <tr key={index} className="bg-gray-800 text-white">
                <td className="p-2">{hotel.hotelName}</td>
                <td className="p-2">{hotel.location}</td>
                <td className="p-2">{hotel.price}</td>
                <td className="p-2">{hotel.rating}</td>
                <td className="p-2">{hotel.reviews}</td>
                <td className="p-2 flex space-x-2">
                  {/* Tombol Edit */}
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  {/* Tombol Hapus */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-2/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingIndex !== null ? "Edit Hotel" : "Add New Hotel"}
              </h2>
              <button
                className="text-xl font-bold"
                onClick={() => setShowModal(false)} // Menutup modal
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Hotel Image */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Hotel Image
                  </label>
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
                  <label className="block text-gray-700 font-bold">
                    Hotel Name
                  </label>
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
                  <label className="block text-gray-700 font-bold">
                    Location
                  </label>
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
                  <label className="block text-gray-700 font-bold">
                    Rating
                  </label>
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
                  <label className="block text-gray-700 font-bold">
                    Reviews
                  </label>
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
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHotel;
