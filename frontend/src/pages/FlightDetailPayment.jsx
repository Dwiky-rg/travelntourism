import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import bcalogo from "../assets/BCA.png";
import mandirilogo from "../assets/Mandiri.png";

const FlightDetailPayment = () => {
  const jadwalId = useParams(); // Access flight schedule ID from URL
  const location = useLocation();
  const flight = location.state?.flight; // Access the flight data passed via navigate
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null); // State for storing user details
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State for selected payment method
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthday: "",
    country: "",
    receipt: null,
    bank: "",
  });

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login"); // Redirect if token is not found
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
        setUserDetails(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file); // Log file untuk memastikan file dipilih dengan benar
      setFormData({ ...formData, receipt: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set image preview jika diperlukan
        console.log("File read result:", reader.result);
      };
      reader.readAsDataURL(file); // Membaca file jika ada
    }
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("gender", formData.gender);
    form.append("birthday", formData.birthday);
    form.append("country", formData.country);
    form.append("bank", selectedPaymentMethod); // Selected payment method
    form.append("jadwalId", jadwalId.id); // Use jadwalId from URL params
    form.append("receipt", formData.receipt); // Append the file for payment proof

    try {
      const response = await fetch(
        "http://localhost:5000/pesawat/book/flight/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      // Use response.json() directly to parse the response body
      const data = await response.json();

      // Check if the response is OK
      if (!response.ok) {
        console.error(
          "Error submitting the booking:",
          data.message || response.statusText
        );
        throw new Error(data.message || "Failed to complete the booking");
      }

      // Show SweetAlert for success
      Swal.fire({
        title: "Booking Successful!",
        text: "Your flight booking was successful.",
        icon: "success",
        confirmButtonText: "Go to Booking",
      }).then(() => {
        navigate(`/pesawat/histori`);
      }); // Redirect to the success page on success
    } catch (error) {
      console.error("Error submitting the booking:", error);
      // Optionally show an alert or message to the user
      Swal.fire({
        title: "Error!",
        text: "Something went wrong with the booking. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 mt-14">
      <div className="w-full max-w-5xl">
        {/* Detail Pemesan */}
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

        {/* Flight Schedule Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Flight Schedule
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Flight:</span>
              <div className="flex items-center">
                {/* Image of the airline logo */}
                <img
                  src={`/images-airlines/${flight.pesawat.logo}`}
                  alt={`${flight.pesawat.airline} Logo`}
                  className="w-12 h-12 object-contain mr-4"
                />
                <span className="text-lg font-bold text-gray-800">
                  {flight.pesawat.airline}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Departure:</span>
              <span className="text-lg text-gray-800">
                {flight.origin} to {flight.destination}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Flight Date:</span>
              <span className="text-lg text-gray-800">
                {new Date(flight.flightDate).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Departure Time:</span>
              <span className="text-lg text-gray-800">
                {flight.departureTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Arrival Time:</span>
              <span className="text-lg text-gray-800">
                {flight.arrivalTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Class:</span>
              <span className="text-lg text-gray-800">{flight.class}</span>
            </div>
            <div className="flex justify-between border-t pt-4 mt-4 border-gray-300">
              <span className="font-medium text-gray-600">Price:</span>
              <span className="text-lg font-bold text-blue-500">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(flight.price)}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Detail Penumpang */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-lg font-semibold mb-6">Passenger Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Full Name"
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Nationality</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-lg font-semibold mb-6">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select Payment Method</option>
                  <option value="bni">BNI - 0987654321 </option>
                  <option value="bca">BCA - 1237916512</option>
                  <option value="bri">BRI - 1739754271</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Payment Proof</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePaymentProofChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white w-full px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </section>
  );
};

export default FlightDetailPayment;
