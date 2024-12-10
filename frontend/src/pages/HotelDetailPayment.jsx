import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const HotelDetailPayment = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hotel/${id}`
        );
        setHotel(response.data);
      } catch (error) {
        console.error("Failed to fetch hotel data:", error);
      }
    };

    fetchHotel();
  }, [id]);

  const rooms = hotel
    ? [
        { type: "Single Room", basePrice: hotel.price, extraCharge: 0 },
        {
          type: "Double Room",
          basePrice: hotel.price * 1.2,
          extraCharge: 0.05,
        },
        { type: "Twin Room", basePrice: hotel.price * 1.3, extraCharge: 0.1 },
        {
          type: "Superior Room",
          basePrice: hotel.price * 1.5,
          extraCharge: 0.25,
        },
        { type: "Deluxe Room", basePrice: hotel.price * 1.8, extraCharge: 0.4 },
        { type: "Family Room", basePrice: hotel.price * 2.0, extraCharge: 0.6 },
      ]
    : [];

  const handleRoomChange = (e) => {
    const room = rooms.find((r) => r.type === e.target.value);
    setSelectedRoom(room);
    if (checkInDate && checkOutDate) {
      calculateTotalPrice(room, checkInDate, checkOutDate);
    }
  };

  const handleCheckInChange = (e) => {
    const date = e.target.value;
    setCheckInDate(date);
    if (selectedRoom && checkOutDate) {
      calculateTotalPrice(selectedRoom, date, checkOutDate);
    }
  };

  const handleCheckOutChange = (e) => {
    const date = e.target.value;
    setCheckOutDate(date);
    if (selectedRoom && checkInDate) {
      calculateTotalPrice(selectedRoom, checkInDate, date);
    }
  };

  const calculateTotalPrice = (room, checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = (checkOutDate - checkInDate) / (1000 * 3600 * 24);

      if (nights > 0) {
        const roomPricePerNight = room.basePrice * (1 + room.extraCharge);
        const total = roomPricePerNight * nights;
        setTotalPrice(total);
      } else {
        setTotalPrice(0);
      }
    }
  };

  const formatPrice = (price) => {
    // Round the price to 2 decimal places before formatting
    const roundedPrice = price.toFixed(2);

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(roundedPrice);
  };

  const confirmBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      userId: userDetails.id,
      hotelId: hotel.id,
      roomType: selectedRoom.type,
      checkInDate,
      checkOutDate,
      totalPrice: Math.floor(totalPrice),
      paymentReceipt,
      selectedBank,
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        Swal.fire({
          title: "Error",
          text: "You need to be logged in to confirm the booking.",
          icon: "error",
          confirmButtonText: "Okay",
        });
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("receipt", paymentReceipt);
      formData.append("checkInDate", checkInDate);
      formData.append("checkOutDate", checkOutDate);
      formData.append("rooms", selectedRoom.type);
      formData.append("hotelId", hotel.id);
      formData.append("bank", selectedBank);
      formData.append("totalPrice", totalPrice);

      // Log FormData content before sending
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.post(
        "http://localhost:5000/hotel/book/hotel/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Booking Confirmed!",
          text: "Your booking has been confirmed successfully.",
          icon: "success",
          confirmButtonText: "Go to Booking",
        }).then(() => {
          navigate(`/hotel/histori`);
        });
      } else {
        Swal.fire({
          title: "Booking Failed",
          text: "Please try again later.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while confirming the booking.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  if (!hotel) return <p>Loading...</p>;

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 mt-14">
      <div className="w-full max-w-5xl">
        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-lg font-semibold mb-6">
            Contact Details (Booking details will be sent to)
          </h2>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={userDetails?.name || "John Doe"} // Use fetched user details or placeholder
                className="w-full border rounded-lg p-2"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                value={userDetails?.email || "user@example.com"} // Use fetched email or placeholder
                className="w-full border rounded-lg p-2"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">No. HP</label>
              <input
                type="text"
                value={userDetails?.phone || "081234567890"} // Use fetched phone or placeholder
                className="w-full border rounded-lg p-2"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Hotel and Room Selection */}
        <form onSubmit={confirmBooking} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            {/* Hotel Details Section */}
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="flex items-center text-gray-500 mt-2">
              <span className="mr-1">Location:</span>
              <span>{hotel.location}</span>
            </div>
            <div className="mt-6">
              <label className="font-medium">Select Room Type</label>
              <select
                className="w-full p-2 mt-2 border rounded-lg"
                onChange={handleRoomChange}
                value={selectedRoom?.type || ""}
              >
                <option value="">Select Room</option>
                {rooms.map((room, index) => (
                  <option key={index} value={room.type}>
                    {room.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <label className="font-medium">Check-In Date</label>
              <input
                type="date"
                className="w-full p-2 mt-2 border rounded-lg"
                onChange={handleCheckInChange}
                value={checkInDate}
              />
            </div>
            <div className="mt-6">
              <label className="font-medium">Check-Out Date</label>
              <input
                type="date"
                className="w-full p-2 mt-2 border rounded-lg"
                onChange={handleCheckOutChange}
                value={checkOutDate}
              />
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#21409A]">
                Total Price: {formatPrice(totalPrice)}
              </h3>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-lg font-semibold mb-6">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Payment Method</label>
                <select
                  onChange={(e) => setSelectedBank(e.target.value)}
                  value={selectedBank}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select Payment Method</option>
                  <option value="bni">BNI - 0987654321</option>
                  <option value="bca">BCA - 1237916512</option>
                  <option value="bri">BRI - 1739754271</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Payment Proof</label>
                <input
                  type="file"
                  onChange={(e) => setPaymentReceipt(e.target.files[0])}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-[#21409A] text-white w-full px-6 py-2 rounded-lg focus:outline-none"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </section>
  );
};

export default HotelDetailPayment;
