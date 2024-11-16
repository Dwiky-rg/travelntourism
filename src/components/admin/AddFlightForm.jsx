import React, { useState } from "react";
import { GiCommercialAirplane } from "react-icons/gi";

const AddFlightForm = () => {
  const [formData, setFormData] = useState({
    airline: "",
    price: "",
    departure: "",
    arrival: "",
    date: "",
    from: "",
    to: "",
    logo: null, // Untuk menyimpan logo maskapai
    classType: "",
  });
  const [flights, setFlights] = useState([]); // State untuk menyimpan penerbangan
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State untuk kontrol modal
  const [editingIndex, setEditingIndex] = useState(null); // Index penerbangan yang sedang diedit

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      logo: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi harga harus lebih dari 0
    if (parseFloat(formData.price) <= 0) {
      setMessage("Harga harus lebih dari 0.");
      setIsSuccess(false);
      return;
    }

    // Validasi logo maskapai
    if (!formData.logo) {
      setMessage("Logo maskapai harus diunggah.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);

    // Simulasi pengiriman data
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setMessage("Penerbangan berhasil ditambahkan!");

      // Jika sedang mengedit, update data penerbangan, jika tidak, tambah penerbangan baru
      if (editingIndex !== null) {
        const updatedFlights = [...flights];
        updatedFlights[editingIndex] = {
          ...formData,
          logo: URL.createObjectURL(formData.logo), // Tampilkan logo yang baru diupload
        };
        setFlights(updatedFlights);
        setEditingIndex(null); // Reset indeks setelah edit
      } else {
        setFlights([
          ...flights,
          {
            ...formData,
            logo: URL.createObjectURL(formData.logo), // Tampilkan logo yang baru diupload
          },
        ]);
      }

      setFormData({
        airline: "",
        price: "",
        departure: "",
        arrival: "",
        date: "",
        from: "",
        to: "",
        logo: null,
        classType: "",
      });
      setTimeout(() => setMessage(""), 3000); // Reset pesan setelah 3 detik
      setShowModal(false); // Tutup modal setelah submit
    }, 2000);
  };

  // Fungsi untuk mengedit data penerbangan
  const handleEdit = (index) => {
    const flightToEdit = flights[index];
    setFormData({
      ...flightToEdit,
      logo: null, // Karena file tidak bisa dipassing langsung, harus diupload ulang
    });
    setEditingIndex(index); // Set index penerbangan yang akan diedit
    setShowModal(true); // Tampilkan modal untuk edit
  };

  // Fungsi untuk menghapus data penerbangan
  const handleDelete = (index) => {
    const updatedFlights = flights.filter((_, i) => i !== index);
    setFlights(updatedFlights); // Hapus penerbangan dari daftar
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <GiCommercialAirplane className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Flight Management</h1>
      </div>

      {/* Tombol Add New Flight */}
      <button
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4"
        onClick={() => setShowModal(true)} // Menampilkan modal
      >
        Add New Flight
      </button>

      {/* Tabel data penerbangan */}
      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Flight Data</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2">Airline</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Date</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>{" "}
              {/* Kolom untuk tombol Edit dan Hapus */}
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={index} className="bg-gray-800 text-white">
                <td className="p-2">{flight.airline}</td>
                <td className="p-2">{flight.from}</td>
                <td className="p-2">{flight.to}</td>
                <td className="p-2">{flight.date}</td>
                <td className="p-2">{flight.price}</td>
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
                {editingIndex !== null ? "Edit Flight" : "Add New Flight"}
              </h2>
              <button
                className="text-xl font-bold"
                onClick={() => setShowModal(false)} // Menutup modal
              >
                &times;
              </button>
            </div>

            {message && (
              <p
                className={`mb-4 ${
                  isSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Logo</label>
                  <input
                    type="file"
                    name="logo"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Airline
                  </label>
                  <input
                    type="text"
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">From</label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">To</label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Class</label>
                  <select
                    name="classType"
                    value={formData.classType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div className="mb-4 col-span-2">
                  <label className="block text-gray-700 font-bold">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    min="1"
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

export default AddFlightForm;
