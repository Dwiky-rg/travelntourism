import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom"; // Import Link dari react-router-dom untuk navigasi

const Hotel = () => {
  const [location, setLocation] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [card, setCard] = useState([]); // State untuk menyimpan data hotel
  const [filteredHotels, setFilteredHotels] = useState([]); // State untuk menyaring hotel
  const [isSearched, setIsSearched] = useState(false); // State untuk mengecek apakah pencarian telah dilakukan

  // Fetch data hotel saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel`);
        setCard(response.data); // Simpan semua data hotel
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    fetchHotels();
    window.scrollTo(0, 0); // Scroll ke atas saat pertama kali dimuat
  }, []);

  // Fungsi untuk menangani pencarian berdasarkan kota dan nama hotel
  const handleSearch = () => {
    let filtered = card;

    // Filter berdasarkan lokasi
    if (location.trim()) {
      filtered = filtered.filter((hotel) => hotel.location.toLowerCase().includes(location.toLowerCase()));
    }

    // Filter berdasarkan nama hotel
    if (hotelName.trim()) {
      filtered = filtered.filter((hotel) => hotel.name.toLowerCase().includes(hotelName.toLowerCase()));
    }

    setFilteredHotels(filtered);
    setIsSearched(true); // Tandai bahwa pencarian telah dilakukan
  };

  // Fungsi untuk format harga
  const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);

  // Fungsi untuk menampilkan bintang rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-500">
            ★
          </span>
        ))}
        {/* Half star */}
        {halfStar && <span className="text-yellow-500">☆</span>}
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 mt-14">
      <div className="w-full max-w-7xl lg:p-8 rounded-lg mb-4">
        {/* Form pencarian */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaLocationDot className="mr-2 text-blue-500" />
                <input type="text" placeholder="Enter city" className="w-full outline-none" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Hotel Name</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaLocationDot className="mr-2 text-blue-500" />
                <input type="text" placeholder="Enter hotel name" className="w-full outline-none" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
              </div>
            </div>
          </div>
          {/* Tombol Search */}
          <div className="mt-4 flex justify-center">
            <button onClick={handleSearch} className="bg-black w-full text-white py-2 px-4 rounded-lg">
              Search
            </button>
          </div>
        </div>

        {/* Hotel Cards */}
        <div className="grid grid-cols-1 gap-8 max-w-7xl w-full mt-8 overflow-auto max-h-[500px]">
          {isSearched ? (
            filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {filteredHotels.map((hotel, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden shadow-lg mb-4">
                    <img src={`/images-hotels/${hotel.image}`} alt={hotel.name} className="w-full h-56 object-cover" />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold">{hotel.name}</h2>
                      <div className="flex items-center text-gray-500 mt-2">
                        <FaLocationDot className="mr-1" />
                        <span>{hotel.location}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-xl font-bold">{formatPrice(hotel.price)}</span>
                      </div>
                      {/* Render Rating */}
                      <div className="mt-2 text-yellow-500">{renderRating(hotel.rating)}</div>

                      {/* Tombol Book Hotel */}
                      <div className="mt-4 w-full">
                        <Link to={`/hotel/booking/${hotel.id}`} className="mt-4 bg-black text-white py-2 px-4 w-full rounded-lg text-center">
                          Book Hotel
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No hotels found</p>
            )
          ) : (
            <p className="text-center text-gray-500">Search berdasarkan nama hotel dan lokasi hotel</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hotel;
