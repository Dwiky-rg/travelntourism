import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2

const UserData = () => {
  const [users, setUsers] = useState([]); // State untuk menyimpan data pengguna
  const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  // Mengambil data pengguna saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(response.data); // Mengasumsikan respon berupa array data pengguna
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
        Swal.fire({
          title: "Kesalahan",
          text: "Gagal mengambil data pengguna.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchUsers();
  }, []); // Empty dependency array memastikan ini hanya dijalankan saat mount pertama kali

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Kesalahan",
        text: "Kata sandi dan konfirmasi kata sandi tidak cocok!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/add`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Berhasil",
          text: "Pengguna berhasil ditambahkan!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setShowModal(false); // Menutup modal setelah berhasil menambahkan
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan pengguna:", error);
      Swal.fire({
        title: "Kesalahan",
        text: "Gagal menambahkan pengguna. Coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan bisa membatalkan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak, batalkan",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
        if (response.status === 200) {
          setUsers(users.filter((user) => user.id !== id));
          Swal.fire("Terhapus!", "Pengguna telah dihapus.", "success");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus pengguna:", error);
        Swal.fire("Kesalahan!", "Ada masalah saat menghapus pengguna.", "error");
      }
    }
  };

  // Menangani klik tombol Edit
  const handleEdit = (user) => {
    setEditFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "", // Reset password saat mengedit
      confirmPassword: "", // Reset confirmPassword saat mengedit
      role: user.role,
    });
    setShowModal(true); // Menampilkan modal untuk edit
  };

  // Menangani pengiriman form update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editFormData.password !== editFormData.confirmPassword) {
      Swal.fire({
        title: "Kesalahan",
        text: "Kata sandi dan konfirmasi kata sandi tidak cocok!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${editFormData.id}`, {
        name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
        password: editFormData.password,
        role: editFormData.role,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Berhasil",
          text: "Pengguna berhasil diperbarui!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === editFormData.id ? { ...user, ...response.data } : user)));
        setShowModal(false); // Menutup modal setelah update
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui pengguna:", error);
      Swal.fire({
        title: "Kesalahan",
        text: "Gagal memperbarui pengguna. Coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <FaUser className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Manajemen User</h1>
      </div>

      {/* Tombol untuk menambah pengguna baru */}
      <button className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4" onClick={() => setShowModal(true)}>
        Tambah User Baru
      </button>

      {/* Tabel menampilkan data pengguna */}
      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Data User</h2>
        <table className="min-w-full text-sm text-left text-gray-500 border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2">Nama</th>
              <th className="p-2">Email</th>
              <th className="p-2">Telepon</th>
              <th className="p-2">Role</th>
              <th className="p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="bg-gray-800 hover:bg-gray-700 transition duration-300">
                  <td className="p-2 text-white">{user.name}</td>
                  <td className="p-2 text-white">{user.email}</td>
                  <td className="p-2 text-white">{user.phone}</td>
                  <td className="p-2 text-white">{user.role}</td>
                  <td className="p-2 text-white text-center">
                    {/* Tombol Edit untuk setiap pengguna */}
                    <button onClick={() => handleEdit(user)} className="text-white bg-blue-600 font-semibold py-1 px-3 rounded-lg transition duration-300">
                      Edit
                    </button>

                    {/* Tombol Hapus untuk setiap pengguna */}
                    <button onClick={() => handleDelete(user.id)} className="text-white bg-red-600 font-semibold py-1 px-3 rounded-lg ml-2 transition duration-300">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-white bg-gray-800">
                  Tidak ada user ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-2/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{editFormData.id ? "Edit User" : "Tambah User Baru"}</h2>
              <button className="text-xl font-bold" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={editFormData.id ? handleUpdate : handleSubmit}>
              {/* Nama */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">Nama</label>
                <input type="text" name="name" value={editFormData.name || formData.name} onChange={editFormData.id ? (e) => setEditFormData({ ...editFormData, name: e.target.value }) : handleChange} className="w-full p-2 border rounded" />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email || formData.email}
                  onChange={editFormData.id ? (e) => setEditFormData({ ...editFormData, email: e.target.value }) : handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Telepon */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={editFormData.phone || formData.phone}
                  onChange={editFormData.id ? (e) => setEditFormData({ ...editFormData, phone: e.target.value }) : handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">Kata Sandi</label>
                <input
                  type="password"
                  name="password"
                  value={editFormData.password || formData.password}
                  onChange={editFormData.id ? (e) => setEditFormData({ ...editFormData, password: e.target.value }) : handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">Konfirmasi Kata Sandi</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={editFormData.confirmPassword || formData.confirmPassword}
                  onChange={editFormData.id ? (e) => setEditFormData({ ...editFormData, confirmPassword: e.target.value }) : handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Peran */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">role</label>
                <select name="role" value={editFormData.role || formData.role} onChange={editFormData.id ? (e) => setEditFormData({ ...editFormData, role: e.target.value }) : handleChange} className="w-full p-2 border rounded">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Tombol Submit */}
              <div className="mb-4 text-right">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  {editFormData.id ? "Perbarui" : "Tambah"} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserData;
