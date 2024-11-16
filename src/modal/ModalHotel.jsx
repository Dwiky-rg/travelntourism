import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { IoStar } from "react-icons/io5";

const ModalHotel = ({ isModalOpen, selectedHotel, closeModal }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [numNights, setNumNights] = useState(1);

  if (!selectedHotel) return null;

  const basePrice = parseFloat(selectedHotel.price.replace(/\./g, ""));

  useEffect(() => {
    if (isModalOpen) {
      const defaultRoom = { type: "Single Room", extraCharge: 0 };
      const finalPrice = basePrice * (1 + defaultRoom.extraCharge);
      setSelectedRoom({ ...defaultRoom, finalPrice });
    }
  }, [isModalOpen, selectedHotel, basePrice]);

  const rooms = [
    { type: "Single Room", extraCharge: 0 },
    { type: "Double Room", extraCharge: 0.05 },
    { type: "Twin Room", extraCharge: 0.1 },
    { type: "Superior Room", extraCharge: 0.25 },
    { type: "Deluxe Room", extraCharge: 0.4 },
    { type: "Family Room", extraCharge: 0.6 },
  ];

  const handleRoomChange = (event) => {
    const selectedType = event.target.value;
    const room = rooms.find((room) => room.type === selectedType);

    if (room && basePrice) {
      const finalPrice = basePrice * (1 + room.extraCharge);
      setSelectedRoom({ ...room, finalPrice });
    }
  };

  const handleNightChange = (event) => {
    setNumNights(Number(event.target.value));
  };

  const totalPrice = selectedRoom ? selectedRoom.finalPrice * numNights : 0;

  return (
    isModalOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-lg w-11/12 max-w-4xl p-6 flex flex-col md:flex-row relative shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 cursor-pointer text-2xl hover:text-red-500 transition duration-300"
          >
            <FaTimes />
          </button>

          <div className="w-full md:w-1/2 flex-shrink-0">
            <img
              src={selectedHotel.imageUrl}
              alt={`${selectedHotel.name} hotel`}
              className="w-full h-[465px] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="w-full md:w-1/2 md:ml-6 mt-3">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedHotel.name}
            </h2>
            <p className="text-gray-500 mt-2 flex items-center">
              <SlLocationPin className="mr-1" />
              {selectedHotel.location}
            </p>
            <p className="mt-2 flex items-center">
              <IoStar className="mr-1 text-yellow-400" />
              {selectedHotel.rating} ({selectedHotel.reviews} Reviews)
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Select Room
              </h3>
              <select
                id="roomType"
                onChange={handleRoomChange}
                value={selectedRoom ? selectedRoom.type : "Single Room"}
                className="block w-full bg-white border border-gray-300 text-gray-900 rounded-lg py-2 px-3 pr-10 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                {rooms.map((room) => (
                  <option
                    key={room.type}
                    value={room.type}
                    className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-200"
                  >
                    {room.type}
                  </option>
                ))}
              </select>
            </div>

            {selectedRoom && (
              <div className="mt-4 text-gray-700">
                <p>
                  Room type:{" "}
                  <span className="font-medium">{selectedRoom.type}</span>
                </p>
                <p>
                  Price per night:{" "}
                  <span className="font-semibold text-blue-600">
                    IDR {selectedRoom.finalPrice.toLocaleString()}
                  </span>
                </p>
              </div>
            )}

            <div className="mt-4">
              <label
                htmlFor="numNights"
                className="block text-sm font-semibold text-gray-700"
              >
                How many nights will you stay?
              </label>
              <input
                id="numNights"
                type="number"
                value={numNights}
                onChange={handleNightChange}
                min="1"
                className="mt-2 block w-full bg-white border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            {selectedRoom && (
              <div className="mt-4 text-gray-800">
                <p className="text-lg font-bold">
                  Total Price for {numNights} night:
                  <span className="text-blue-600">
                    {" "}
                    IDR {totalPrice.toLocaleString()}
                  </span>
                </p>
              </div>
            )}

            <button className="w-full text-white py-2 rounded-lg mt-6 bg-black hover:bg-gray-500 transition duration-300">
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalHotel;
