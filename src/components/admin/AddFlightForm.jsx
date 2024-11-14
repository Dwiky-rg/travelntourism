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
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

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
    }, 2000);
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <GiCommercialAirplane className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">ADD NEW FLIGHT</h1>
      </div>
      {message && (
        <p className={`mb-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
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
            <label className="block text-gray-700 font-bold">Airline</label>
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

          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Departure</label>
            <input
              type="time"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Arrival</label>
            <input
              type="time"
              name="arrival"
              value={formData.arrival}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
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
            "Add Flight"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddFlightForm;