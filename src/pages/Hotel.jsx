import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMoon, FaUser, FaTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoStar } from "react-icons/io5";
import { MdLocalHotel } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import image from "../assets/Hotel.jpg";
import ModalHotel from "../modal/ModalHotel";

const card = [
  {
    name: "Somerset Sudirman Jakarta",
    location: "Jakarta",
    rating: 4.7,
    reviews: 2578,
    price: "1.232.353",
    imageUrl: image,
  },
];

const Hotel = () => {
  const [location, setLocation] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(card);
  const [checkInDate, setCheckInDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll ke atas saat pertama kali dimuat
  }, []);

  // Fungsi untuk menangani pencarian hotel berdasarkan lokasi
  const handleSearch = () => {
    const filtered = card.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  // Fungsi untuk menangani pemilihan kamar dan menampilkan modal
  const handleSelectRoom = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedHotel(null);
    setIsModalOpen(false);
  };

  // Render komponen Hotel
  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 mt-14">
      <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md mb-4">
        {/* Form pencarian */}
        <div className="flex justify-between items-center">
          <div className="flex-1 mr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City or hotel name
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaLocationDot className="mr-2 text-blue-500" />
              <input
                type="text"
                placeholder="City, hotel, place to go"
                className="w-full outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 mx-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Check-in
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaCalendarAlt className="mr-2 text-blue-500" />
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                placeholderText="Select a date"
                className="w-full outline-none"
                dateFormat="dd-MM-yyyy"
              />
            </div>
          </div>
          <div className="flex-1 ml-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Duration
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaMoon className="mr-2 text-blue-500" />
              <input
                type="number"
                placeholder="1 Night"
                className="w-full outline-none"
                min="1"
              />
            </div>
          </div>
          <div className="flex-1 ml-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Guests and Rooms
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaUser className="mr-2 text-blue-500" />
              <input
                type="number"
                placeholder="Guests"
                className="w-1/2 outline-none mr-2"
                min="1"
              />
              <MdLocalHotel className="mr-2 text-blue-500" />
              <input
                type="number"
                placeholder="Rooms"
                className="w-1/2 outline-none"
                min="1"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="w-full text-white px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 gap-8 max-w-7xl w-full">
        <div className="h-[600px] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden shadow-lg mb-4"
                >
                  <img
                    src={hotel.imageUrl}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{hotel.name}</h2>
                    <div className="flex items-center text-gray-500 mt-2">
                      <SlLocationPin className="mr-1" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mt-1">
                      <IoStar className="mr-1 text-yellow-400" />
                      <span>
                        {hotel.rating} ({hotel.reviews} Reviews)
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xl font-bold">
                        IDR {hotel.price}
                      </span>
                    </div>
                    <div className="mt-4">
                      <button
                        className="w-full text-white py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300"
                        onClick={() => handleSelectRoom(hotel)}
                      >
                        Select Room
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No hotels found</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalHotel
          isModalOpen={isModalOpen}
          selectedHotel={selectedHotel}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

export default Hotel;
