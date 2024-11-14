import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaPlaneDeparture,
  FaPlane,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

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
      logo: "https://placehold.co/50x50", // URL logo maskapai
      classType: "Economy",
    },
    {
      id: 2,
      airline: "Lion Air",
      price: "950.000/pax",
      departure: "09:30",
      arrival: "11:30",
      date: "11 Dec 2024",
      from: "Surabaya",
      to: "Jakarta",
      logo: "https://placehold.co/50x50", // URL logo maskapai
      classType: "Business",
    },
    {
      id: 3,
      airline: "Citilink",
      price: "1.200.000/pax",
      departure: "11:00",
      arrival: "13:00",
      date: "11 Dec 2024",
      from: "Bandung",
      to: "Medan",
      logo: "https://placehold.co/50x50", // URL logo maskapai
      classType: "Economy",
    },
    {
      id: 4,
      airline: "AirAsia",
      price: "750.000/pax",
      departure: "12:00",
      arrival: "14:00",
      date: "11 Dec 2024",
      from: "Yogyakarta",
      to: "Surabaya",
      logo: "https://placehold.co/50x50", // URL logo maskapai
      classType: "Economy",
    },
    {
      id: 5,
      airline: "Sriwijaya Air",
      price: "1.100.000/pax",
      departure: "13:00",
      arrival: "15:00",
      date: "12 Dec 2024",
      from: "Medan",
      to: "Jakarta",
      logo: "https://placehold.co/50x50", // URL logo maskapai
      classType: "Business",
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

  // Tambahkan state baru untuk jumlah penumpang
  const [passengerCount, setPassengerCount] = useState(1);

  // Fungsi untuk menambah atau mengurangi jumlah penumpang
  const handlePassengerChange = (change) => {
    setPassengerCount((prevCount) => Math.max(1, prevCount + change));
  };

  // Fungsi untuk menghitung harga total menggunakan calculateTotalPrice
  const calculateTotalPrice = () => {
    if (!selectedFlight) return 0;

    // Ubah harga dari format string ke angka
    const priceNumber = parseInt(
      selectedFlight.price.replace(/\./g, "").replace("/pax", ""),
      10
    );
    return priceNumber * passengerCount;
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
                    className="w-12 h-12 rounded-full"
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
          <p className="text-center text-gray-500">No flights Searched.</p>
        )}
      </div>

      {/* Modal Detail Penerbangan */}
      {isModalOpen && selectedFlight && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedFlight.airline} - {selectedFlight.classType}
              </h2>
              <FaTimes
                className="cursor-pointer text-2xl hover:text-red-500 transition duration-300"
                onClick={handleCloseModal}
              />
            </div>

            {/* Flight Details */}
            <div className="flex items-center mb-4">
              <img
                src={selectedFlight.logo}
                alt="Airline Logo"
                className="w-12 h-12 mr-3 rounded-full border"
              />
              <div>
                <p className="text-lg font-semibold">
                  {selectedFlight.from}
                  <FaArrowRightLong className="inline mx-2" />
                  {selectedFlight.to}
                </p>
                <p className="text-sm text-gray-500">{selectedFlight.date}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-800">Departure:</span>{" "}
                {selectedFlight.departure}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-800">Arrival:</span>{" "}
                {selectedFlight.arrival}
              </p>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                Price:{" "}
                <span className="text-blue-600">{selectedFlight.price}</span>
              </p>
            </div>

            {/* Passenger Selector */}
            <div className="flex items-center justify-center my-4">
              <button
                onClick={() => handlePassengerChange(-1)}
                disabled={passengerCount <= 1}
              >
                <FiMinusCircle className="text-3xl" />
              </button>
              <span className="mx-3 text-lg font-semibold text-gray-700">
                {passengerCount}
              </span>
              <button onClick={() => handlePassengerChange(1)}>
                <FiPlusCircle className="text-3xl" />
              </button>
            </div>

            {/* Total Price */}
            <p className="text-lg font-bold text-gray-800 text-center mt-4">
              Total Price:{" "}
              <span className="text-blue-600">
                IDR {calculateTotalPrice().toLocaleString()}
              </span>
            </p>

            {/* Confirm Button */}
            <button
              className="mt-6 w-full text-white py-3 rounded-lg font-semibold text-lg bg-blue-500 hover:bg-blue-600 transition duration-300"
              onClick={handleCloseModal}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Flight;
