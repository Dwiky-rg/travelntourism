import React, { useState, useEffect } from "react";
import { RiCloseFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PaymentHotelPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [receiptImage, setReceiptImage] = useState(null); // Store the receipt image URL

  // Fetch payment data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${API_URL}/hotel/payments/index`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }
        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Function to update the payment status
  const updatePaymentStatus = async (paymentId, status) => {
    try {
      const response = await fetch(`${API_URL}/hotel/payments/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: paymentId,
          status: status,
        }),
      });

      if (!response.ok) {
        throw new Error(`Gagal memperbarui status pembayaran: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Status pembayaran diperbarui:", data);

      // Refresh payments data after status update
      const updatedPayments = payments.map((payment) => (payment.id === paymentId ? { ...payment, status: status } : payment));
      setPayments(updatedPayments);

      // SweetAlert success notification
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `Status pembayaran berhasil diperbarui menjadi "${status === "terima" ? "Diterima" : "Ditolak"}".`,
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating payment status:", error);

      // SweetAlert error notification
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui status pembayaran. Silakan coba lagi.",
        confirmButtonText: "OK",
      });
    }
  };

  // Open the modal with the receipt image
  const openModal = (receiptUrl) => {
    setReceiptImage(receiptUrl);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setReceiptImage(null);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <RiMoneyDollarCircleFill className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Hotel Payment Management</h1>
      </div>
      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Payment Data</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Booking ID</th>
              <th className="px-4 py-2 text-left">Receipt</th>
              <th className="px-4 py-2 text-left">Bank</th>
              <th className="px-4 py-2 text-left">Payment Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{payment.bookingId}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500" onClick={() => openModal(`/images-payment-hotels/${payment.receipt}`)}>
                    Lihat Bukti
                  </button>
                </td>
                <td className="px-4 py-2">{payment.bank || "Unknown"}</td>
                <td className="px-4 py-2">
                  {payment.paymentDate
                    ? new Date(payment.paymentDate).toLocaleString("id-ID", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })
                    : "N/A"}
                </td>
                <td className="px-4 py-2">
                  <span className={`status-label ${payment.status === "proses" ? "bg-yellow-500 rounded-md p-2 text-white" : payment.status === "terima" ? "bg-green-500 rounded-md p-2 text-white" : "bg-red-500 rounded-md p-2 text-white"}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {payment.status === "proses" ? (
                    <>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md" onClick={() => updatePaymentStatus(payment.id, "terima")}>
                        Accept
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded-md ml-2" onClick={() => updatePaymentStatus(payment.id, "ditolak")}>
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying the receipt */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg max-w-xl w-full">
            <div className="relative">
              <button onClick={closeModal} className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full">
                <RiCloseFill className="text-white text-xl" />
              </button>
              <img src={receiptImage} alt="Receipt" className="max-w-full h-auto mx-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHotelPage;
