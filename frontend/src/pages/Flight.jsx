import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlaneDeparture, FaPlane, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Flight = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    flightClass: "",
    flightDate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch flight schedules and airlines
    const fetchFlightData = async () => {
      try {
        setLoading(true);
        const [flightRes, airlineRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/jadwal-penerbangan"),
          axios.get(import.meta.env.VITE_API_URL + "/pesawat"),
        ]);
        setFlights(flightRes.data); // Assuming flightRes.data contains flight schedule data
        setFilteredFlights([]);
        setAirlines(airlineRes.data); // Assuming airlineRes.data contains airline information
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight data", error);
        setLoading(false);
      }
    };

    fetchFlightData();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => {
      const newParams = { ...prev, [name]: value };
      return newParams;
    });
  };

  const handleSearch = () => {
    const { origin, destination, flightClass, flightDate } = searchParams;

    const filtered = flights.filter((flight) => {
      return (
        (origin
          ? flight.origin.toLowerCase().includes(origin.toLowerCase())
          : true) &&
        (destination
          ? flight.destination.toLowerCase().includes(destination.toLowerCase())
          : true) &&
        (flightClass
          ? flight.class.toLowerCase() === flightClass.toLowerCase()
          : true) &&
        (flightDate
          ? flight.flightDate.slice(0, 10) === flightDate // Compare only the date part of flightDate
          : true)
      );
    });

    setFilteredFlights(filtered);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  const formatFlightDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 mt-14">
      {/* Search Form */}
      <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md mb-4">
        <div className="flex items-center mb-4">
          <FaPlaneDeparture className="text-blue-500 text-3xl mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">BOOK YOUR FLIGHT</h1>
        </div>

        <form className="flex flex-wrap gap-4">
          {/* Input Fields */}
          <div className="flex-1 min-w-[150px] sm:w-1/2 lg:w-1/4">
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
              value={searchParams.origin}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Where from?"
            />
          </div>
          <div className="flex-1 min-w-[150px] sm:w-1/2 lg:w-1/4">
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
              value={searchParams.destination}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Where to?"
            />
          </div>
          <div className="flex-1 min-w-[150px] sm:w-1/2 lg:w-1/4">
            <label
              htmlFor="flightDate"
              className="block text-gray-700 font-semibold mb-1"
            >
              Flight Date
            </label>
            <input
              type="date"
              id="flightDate"
              name="flightDate"
              value={searchParams.flightDate}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[150px] sm:w-1/2 lg:w-1/4">
            <label
              htmlFor="flightClass"
              className="block text-gray-700 font-semibold mb-1"
            >
              Class
            </label>
            <select
              id="flightClass"
              name="flightClass"
              value={searchParams.flightClass}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select Class
              </option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
        </form>

        {/* Search Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white w-full px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Search Flights
          </button>
        </div>
      </div>

      {/* Flights List */}
      <div className="w-full max-w-7xl overflow-y-auto max-h-[500px] pr-2">
        {filteredFlights.length === 0 &&
        searchParams.origin &&
        searchParams.destination ? (
          <div>No flights found.</div>
        ) : (
          filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-lg shadow-lg p-6 w-full mb-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 w-1/3">
                  <img
                    src={`/images-airlines/${flight.pesawat.logo}`}
                    className="w-32 h-32 object-cover"
                  />
                  <div>
                    <div className="text-lg font-semibold">
                      {flight.pesawat.airline}
                    </div>
                    <div className="text-sm text-gray-500">{flight.class}</div>
                    <div className="text-sm text-gray-500">
                      {formatPrice(flight.price)}/pax
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3 text-center">
                  <FaPlane className="text-gray-500 text-lg" />
                  <div className="text-sm text-gray-500">
                    {formatFlightDate(flight.flightDate)}
                  </div>
                </div>
                <div className="flex items-center justify-center w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">
                        {flight.origin}
                      </div>
                      <FaArrowRight className="text-gray-500" />
                      <div className="text-sm text-gray-500">
                        {flight.destination}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {flight.departureTime} - {flight.arrivalTime}
                    </div>
                  </div>
                </div>
              </div>
              {/* Book Flight Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() =>
                    navigate(`/flight/booking/${flight.id}`, {
                      state: { flight },
                    })
                  }
                  className="text-white rounded-full px-10 py-2 bg-blue-500 hover:bg-blue-600 transition duration-300"
                >
                  Book Flight
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Flight;
