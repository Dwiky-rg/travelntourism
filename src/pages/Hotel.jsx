import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMoon, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoStar } from "react-icons/io5";
import { MdLocalHotel } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const card = [
  {
    name: "Somerset Sudirman Jakarta",
    location: "Jakarta",
    rating: 4.7,
    reviews: 2578,
    price: "1.232.353",
    imageUrl: "https://placehold.co/300x200",
  },
  {
    name: "The Orient Jakarta Hotel",
    location: "Jakarta",
    rating: 4.8,
    reviews: 1236,
    price: "855.233",
    imageUrl: "https://placehold.co/300x200",
  },
  {
    name: "Daun Bali Seminyak Hotel",
    location: "Bali",
    rating: 4.7,
    reviews: 1356,
    price: "1.329.559",
    imageUrl: "https://placehold.co/300x200",
  },
  {
    name: "The Apurva Kempinski Bali",
    location: "Bali",
    rating: 4.9,
    reviews: 985,
    price: "743.801",
    imageUrl: "https://placehold.co/300x200",
  },
  {
    name: "Bumi Surabaya City Resort",
    location: "Surabaya",
    rating: 4.9,
    reviews: 985,
    price: "1.497.124",
    imageUrl: "https://placehold.co/300x200",
  },
  {
    name: "deMira Hotel Gubeng Surabaya",
    location: "Surabaya",
    rating: 4.9,
    reviews: 985,
    price: "2.083.954",
    imageUrl: "https://placehold.co/300x200",
  },
];

const Hotel = () => {
  const [location, setLocation] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(card);
  const [checkInDate, setCheckInDate] = useState(null);
  useEffect(() => {
    // Pastikan halaman selalu di-scroll ke atas saat pertama kali dimuat
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    // Filter hotels based on the location input
    const filtered = card.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 mt-14">
      <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center">
          {/* Location Input */}
          <div className="flex-1 mr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City or hotel name
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaLocationDot className="mr-2" />
              <input
                type="text"
                placeholder="City, hotel, place to go"
                className="w-full outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Date Input with DatePicker */}
          <div className="flex-1 mx-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Check-in
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaCalendarAlt className="mr-2" />
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                placeholderText="Select a date"
                className="w-full outline-none"
                dateFormat="dd-MM-yyyy" // Format tanggal
              />
            </div>
          </div>

          {/* Duration Input */}
          <div className="flex-1 ml-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Duration
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaMoon className="mr-2" />
              <input
                type="number"
                placeholder="1 Night"
                className="w-full outline-none"
                min="1"
              />
            </div>
          </div>

          {/* Guests and Rooms Input */}
          <div className="flex-1 ml-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Guests and Rooms
            </label>
            <div className="flex items-center border rounded-lg p-2">
              <FaUser className="mr-2" />
              <input
                type="number"
                placeholder="Guests"
                className="w-1/2 outline-none mr-2"
                min="1"
              />
              <MdLocalHotel className="mr-2" />
              <input
                type="number"
                placeholder="Rooms"
                className="w-1/2 outline-none"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-4">
          <button
            className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1  gap-8 max-w-7xl w-full">
        {/* Scrollable Hotel Cards */}
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

                    {/* Location */}
                    <div className="flex items-center text-gray-500 mt-2">
                      <SlLocationPin className="mr-1" />
                      <span>{hotel.location}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center text-gray-500 mt-1">
                      <IoStar className="mr-1 text-yellow-400" />
                      <span>
                        {hotel.rating} ({hotel.reviews} Reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                      <span className="text-xl font-bold">
                        IDR {hotel.price}
                      </span>
                    </div>
                    {/* Button Book Hotel */}
                    <div className="mt-4">
                      <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-500 transition duration-300">
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
    </section>
  );
};

export default Hotel;
