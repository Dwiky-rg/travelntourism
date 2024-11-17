import React, { useState, useEffect } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const ConfirmPayment = () => {
  // State untuk menyimpan data pembayaran yang menunggu konfirmasi
  const [payments, setPayments] = useState([]);

  // Fetch data pembayaran (misalnya dari API atau database)
  useEffect(() => {
    // Contoh data pembayaran yang menunggu konfirmasi
    const fetchedPayments = [
      { id: 1, user: "John Doe", amount: 150000, status: "Pending" },
      // Tambahkan data lainnya jika perlu
    ];

    setPayments(fetchedPayments);
  }, []);

  // Fungsi untuk mengonfirmasi pembayaran
  const confirmPayment = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, status: "Confirmed" } : payment
      )
    );
  };

  // Fungsi untuk membatalkan pembayaran
  const cancelPayment = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, status: "Cancelled" } : payment
      )
    );
  };

  return (
    <div className="w-full mx-auto bg-[#041E31] p-10 rounded-lg h-auto">
      <div className="flex items-center mb-4">
        <RiMoneyDollarCircleFill className="text-white text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-white">Payment Management</h1>
      </div>
      <div className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4">Payment Data</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="px-4 py-2">{payment.user}</td>
                <td className="px-4 py-2">
                  Rp {payment.amount.toLocaleString()}
                </td>
                <td className="px-4 py-2">{payment.status}</td>
                <td className="px-4 py-2 text-center">
                  {payment.status === "Pending" ? (
                    <div>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => confirmPayment(payment.id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => cancelPayment(payment.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmPayment;
