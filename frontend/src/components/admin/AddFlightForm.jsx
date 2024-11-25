import { useEffect, useState } from "react";
import axios from "axios";
import { GiCommercialAirplane } from "react-icons/gi";
import Swal from "sweetalert2";

const AddFlightForm = () => {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newFlight, setNewFlight] = useState({
    pesawatId: "",
    flightDate: "",
    departureTime: "",
    arrivalTime: "",
    destination: "",
    origin: "",
    class: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flightRes, airlineRes] = await Promise.all([axios.get(import.meta.env.VITE_API_URL + "/jadwal-penerbangan"), axios.get(import.meta.env.VITE_API_URL + "/pesawat")]);
        setFlights(flightRes.data);
        setAirlines(airlineRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlight((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddFlight = async () => {
    if (!newFlight.pesawatId || !newFlight.flightDate || !newFlight.departureTime || !newFlight.arrivalTime || !newFlight.destination || !newFlight.origin || !newFlight.class || !newFlight.price) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Semua bidang harus diisi!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/jadwal-penerbangan/add", {
        ...newFlight,
        price: parseFloat(newFlight.price),
      });

      setShowModal(false);
      setNewFlight({
        pesawatId: "",
        flightDate: "",
        departureTime: "",
        arrivalTime: "",
        destination: "",
        origin: "",
        class: "",
        price: "",
      });

      const flightRes = await axios.get(import.meta.env.VITE_API_URL + "/jadwal-penerbangan");
      setFlights(flightRes.data);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Penerbangan berhasil ditambahkan!",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan penerbangan. Silakan coba lagi.",
        timer: 3000,
        timerProgressBar: true,
      });
      console.error("Error adding flight:", err);
    }
  };

  const handleEditFlight = async (flightId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/jadwal-penerbangan/${flightId}`);
      setNewFlight(response.data);
      setIsEditMode(true);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching flight details:", err);
    }
  };

  const handleUpdateFlight = async () => {
    if (!newFlight.pesawatId || !newFlight.flightDate || !newFlight.departureTime || !newFlight.arrivalTime || !newFlight.destination || !newFlight.origin || !newFlight.class || !newFlight.price) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Semua bidang harus diisi!",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/jadwal-penerbangan/update/${newFlight.id}`, {
        ...newFlight,
        price: parseFloat(newFlight.price),
      });

      setShowModal(false);
      setIsEditMode(false);
      setNewFlight({
        pesawatId: "",
        flightDate: "",
        departureTime: "",
        arrivalTime: "",
        destination: "",
        origin: "",
        class: "",
        price: "",
      });

      const flightRes = await axios.get(import.meta.env.VITE_API_URL + "/jadwal-penerbangan");
      setFlights(flightRes.data);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Penerbangan berhasil diperbarui!",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui penerbangan. Silakan coba lagi.",
        timer: 3000,
        timerProgressBar: true,
      });
      console.error("Error updating flight:", err);
    }
  };

  const handleDeleteFlight = async (flightId) => {
    const confirm = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data penerbangan akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/jadwal-penerbangan/${flightId}`);
        setFlights((prev) => prev.filter((flight) => flight.id !== flightId));
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Penerbangan berhasil dihapus!",
          timer: 3000,
          timerProgressBar: true,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus penerbangan. Silakan coba lagi.",
          timer: 3000,
          timerProgressBar: true,
        });
        console.error("Error deleting flight:", err);
      }
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);

  const currentFlights = flights.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(flights.length / itemsPerPage);

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <GiCommercialAirplane className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Flight Management</h1>
      </div>

      <button className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4" onClick={() => setShowModal(true)}>
        Add New Flight
      </button>

      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Flight Data</h2>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : flights.length === 0 ? (
          <p className="text-white">No flights available.</p>
        ) : (
          <>
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="p-2">No</th> {/* Kolom nomor */}
                  <th className="p-2">Airline</th>
                  <th className="p-2">From</th>
                  <th className="p-2">To</th>
                  <th className="p-2">Departure</th>
                  <th className="p-2">Arrival</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Class</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentFlights.map((flight, index) => (
                  <tr key={flight.id} className="bg-gray-800 text-white">
                    <td className="p-2">{index + 1}</td> {/* Menampilkan nomor */}
                    <td className="p-2">{flight.pesawat.airline}</td>
                    <td className="p-2">{flight.origin}</td>
                    <td className="p-2">{flight.destination}</td>
                    <td className="p-2">{flight.departureTime}</td>
                    <td className="p-2">{flight.arrivalTime}</td>
                    <td className="p-2">{flight.flightDate}</td>
                    <td className="p-2">{flight.class}</td>
                    <td className="p-2">{formatPrice(flight.price)}</td>
                    <td className="p-2 flex">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEditFlight(flight.id)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleDeleteFlight(flight.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-center space-x-4">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                Previous
              </button>
              <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full  max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Flight" : "Add New Flight"}</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "Airline", type: "select", name: "pesawatId", options: airlines },
                { label: "Flight Date", type: "date", name: "flightDate" },
                { label: "Departure Time", type: "text", name: "departureTime" },
                { label: "Arrival Time", type: "text", name: "arrivalTime" },
                { label: "Origin", type: "text", name: "origin" },
                { label: "Destination", type: "text", name: "destination" },
                { label: "Class", type: "text", name: "class" },
                { label: "Price", type: "number", name: "price" },
              ].map((field) => (
                <div className="mb-4" key={field.name}>
                  <label className="block text-sm font-bold">{field.label}</label>
                  {field.type === "select" ? (
                    <select name={field.name} value={newFlight[field.name]} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded">
                      <option value="">Select an Airline</option>
                      {field.options?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.airline}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input type={field.type} name={field.name} value={newFlight[field.name]} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
                  )}
                </div>
              ))}
              <div className="flex justify-between">
                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={isEditMode ? handleUpdateFlight : handleAddFlight}>
                  {isEditMode ? "Update Flight" : "Add Flight"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFlightForm;
