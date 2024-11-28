import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import Swal from "sweetalert2";

const PesawatForm = () => {
  const [formData, setFormData] = useState({ airline: "", logo: null });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [pesawats, setPesawats] = useState([]);
  const [currentPesawat, setCurrentPesawat] = useState(null);

  useEffect(() => {
    fetchPesawats();
  }, []);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchPesawats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/pesawat`
      );
      setPesawats(response.data);
    } catch (error) {
      console.error("Error fetching pesawat data", error);
      setMessage({ text: "Error fetching pesawat data", type: "error" });
    }
  };

  const handleAddPesawat = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("airline", formData.airline);
    form.append("logo", formData.logo);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/pesawat/add`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage({ text: "Pesawat added successfully", type: "success" });
        setFormData({ airline: "", logo: null });
        setShowModal(false);
        fetchPesawats();
      } else {
        setMessage({ text: "Failed to add pesawat", type: "error" });
      }
    } catch (error) {
      console.error("Error adding pesawat", error);
      setMessage({ text: "Error adding pesawat", type: "error" });
    }
  };

  const handleUpdatePesawat = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("airline", formData.airline);
    if (formData.logo) {
      form.append("logo", formData.logo);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/pesawat/update/${currentPesawat.id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage({ text: "Pesawat updated successfully", type: "success" });
        setFormData({ airline: "", logo: null });
        setShowModal(false);
        fetchPesawats();
      } else {
        setMessage({ text: "Failed to update pesawat", type: "error" });
      }
    } catch (error) {
      console.error("Error updating pesawat", error);
      setMessage({ text: "Error updating pesawat", type: "error" });
    }
  };

  const handleDeletePesawat = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/pesawat/${id}`
          );

          if (response.status === 200) {
            setMessage({
              text: "Pesawat deleted successfully",
              type: "success",
            });
            fetchPesawats();
          } else {
            setMessage({ text: "Failed to delete pesawat", type: "error" });
          }
        } catch (error) {
          console.error("Error deleting pesawat", error);
          setMessage({ text: "Error deleting pesawat", type: "error" });
        }
      }
    });
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <GiCommercialAirplane className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Flight Management</h1>
      </div>

      {message.text && (
        <div
          className={`mb-6 p-4 text-white rounded-lg ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        onClick={() => {
          setCurrentPesawat(null);
          setFormData({ airline: "", logo: null });
          setShowModal(true);
        }}
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4"
      >
        Add New Airlines
      </button>

      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Airlines Data</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-2">Airline</th>
              <th className="p-2">Logo</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pesawats.map((pesawat) => (
              <tr
                key={pesawat.id}
                className="hover:bg-gray-800 transition duration-200"
              >
                <td className="p-2 text-gray-200">{pesawat.airline}</td>
                <td className="p-2">
                  <img
                    src={`/images-airlines/${pesawat.logo}`}
                    alt="logo"
                    className="w-16 h-16 object-contain"
                  />
                </td>
                <td className="px-4 py-10 flex items-center space-x-4 justify-center">
                  <button
                    onClick={() => {
                      setCurrentPesawat(pesawat);
                      setFormData({ airline: pesawat.airline, logo: null });
                      setShowModal(true);
                    }}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeletePesawat(pesawat.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              {currentPesawat ? "Edit Pesawat" : "Add New Pesawat"}
            </h2>
            <form
              onSubmit={currentPesawat ? handleUpdatePesawat : handleAddPesawat}
              className="space-y-6"
            >
              <div>
                <input
                  type="text"
                  name="airline"
                  value={formData.airline}
                  onChange={(e) =>
                    setFormData({ ...formData, airline: e.target.value })
                  }
                  placeholder="Airline Name"
                  className="border-2 border-gray-700 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <input
                  type="file"
                  name="logo"
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.files[0] })
                  }
                  className="border-2 border-gray-700 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  {currentPesawat ? "Update Pesawat" : "Add Pesawat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PesawatForm;
