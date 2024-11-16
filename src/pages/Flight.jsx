import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaPlaneDeparture,
  FaPlane,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import image from "../assets/Garuda.jpg";
import ModalFlight from "../modal/ModalFlight";

const Flight = () => {
  useEffect(() => {
    // Pastikan halaman selalu di-scroll ke atas saat pertama kali dimuat
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    flightClass: "",
  });

  const [flights, setFlights] = useState([
    {
      id: 1,
      airline: "Garuda Indonesia",
      price: "1.500.000/pax",
      departure: "08:00",
      arrival: "10:00",
      date: "11 Dec 2024",
      from: "Jakarta",
      to: "Bali",
      logo: image, // URL logo maskapai
      classType: "Economy",
    },
  ]);

  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [selectedFlight, setSelectedFlight] = useState(null); // State untuk menyimpan detail penerbangan
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk visibilitas modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter penerbangan berdasarkan inputan form
    const filtered = flights.filter((flight) => {
      // Ubah flight.date ke format yang sama dengan formData.date
      const flightDate = new Date(
        flight.date.split(" ")[2],
        getMonthIndex(flight.date.split(" ")[1]),
        flight.date.split(" ")[0]
      );
      const selectedDate = new Date(formData.date);

      return (
        // Filter berdasarkan asal jika ada
        (formData.origin === "" ||
          flight.from.toLowerCase().includes(formData.origin.toLowerCase())) &&
        // Filter berdasarkan tujuan jika ada
        (formData.destination === "" ||
          flight.to
            .toLowerCase()
            .includes(formData.destination.toLowerCase())) &&
        // Filter berdasarkan tanggal jika ada
        (formData.date === "" ||
          flightDate.toDateString() === selectedDate.toDateString()) &&
        // Filter berdasarkan kelas pesawat jika ada
        (formData.flightClass === "" ||
          flight.classType === formData.flightClass)
      );
    });

    setFilteredFlights(filtered); // Update state dengan penerbangan yang difilter
  };

  // Fungsi untuk mendapatkan index bulan berdasarkan nama bulan
  const getMonthIndex = (month) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.indexOf(month);
  };

  const handleOpenModal = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  const [departureDate, setDepartureDate] = useState(null);

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 mt-14">
      {/* Form Pencarian */}
      <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md mb-4">
        <div className="flex items-center mb-4">
          <FaPlaneDeparture className="text-blue-500 text-3xl mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">BOOK YOUR FLIGHT</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          {/* Input Kota Asal */}
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="origin"
              className="block text-gray-700 font-semibold mb-1"
            >
              From
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Where from?"
            />
          </div>
          {/* Input Kota Tujuan */}
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="destination"
              className="block text-gray-700 font-semibold mb-1"
            >
              To
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Where to?"
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="date"
              className="block text-gray-700 font-semibold mb-1"
            >
              Departure Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Input Jumlah Penumpang */}
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="passengers"
              className="block text-gray-700 font-semibold mb-1"
            >
              Passangers
            </label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Input Kelas Penerbangan */}
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="flightClass"
              className="block text-gray-700 font-semibold mb-1"
            >
              Class
            </label>
            <select
              id="flightClass"
              name="flightClass"
              value={formData.flightClass}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select Class
              </option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>
          {/* Tombol Search */}
          <div className="w-full mt-4">
            <button
              type="submit"
              className="w-full  text-white font-semibold py-2 rounded bg-blue-500 hover:bg-blue-600 transition duration-300"
            >
              Search Flight
            </button>
          </div>
        </form>
      </div>

      {/* Container untuk daftar penerbangan dengan overflow-scroll */}
      <div className="w-full max-w-7xl overflow-y-auto max-h-[500px] pr-2">
        {/* Menampilkan Penerbangan yang difilter */}
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-lg shadow-lg p-6 w-full mb-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 w-1/3">
                  <img
                    src={flight.logo}
                    alt={`${flight.airline} logo`}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-lg font-semibold">
                      {flight.airline}
                    </div>
                    <div className="text-sm text-gray-500">
                      {flight.classType}
                    </div>
                    <div className="text-sm text-gray-500">
                      IDR {flight.price}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3 text-center">
                  <FaPlane className="text-gray-500 text-lg" />
                  <div className="text-sm text-gray-500">{flight.date}</div>
                </div>
                <div className="flex items-center justify-center w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">{flight.from}</div>
                      <FaArrowRight className="text-gray-500" />
                      <div className="text-sm text-gray-500">{flight.to}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {flight.departure} - {flight.arrival}
                    </div>
                  </div>
                </div>
              </div>
              {/* Tombol Book Flight */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleOpenModal(flight)}
                  className="text-white rounded-full px-10 py-2 bg-blue-500 hover:bg-blue-600 transition duration-300"
                >
                  Book Flight
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No flights match your search criteria. Please adjust your filters
            and try again.
          </p>
        )}
      </div>

      {/* Modal Detail Penerbangan */}
      {isModalOpen && selectedFlight && (
        <ModalFlight
          selectedFlight={selectedFlight}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Flight;
