import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserOrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Stable fetchOrders with useCallback
  const fetchOrders = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        withCredentials: true,
      });

      if (Array.isArray(res.data.orders)) {
        console.log("✅ User Orders API Response:", res.data.orders);
        setOrders(res.data.orders);
      } else {
        console.error("❌ Invalid API Response:", res.data);
        setOrders([]);
      }
    } catch (err) {
      console.error("❌ Error Fetching Orders:", err);
      setError("Failed to load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ✅ useEffect with safe dependency
  useEffect(() => {
    if (user) fetchOrders();
  }, [user, fetchOrders]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6">
        <h2 className="mb-4 text-2xl font-semibold">My Orders</h2>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 mb-4 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Orders"}
        </button>

        {loading && <p className="text-gray-600">Loading your orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && orders.length === 0 && (
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        )}

        {!loading && orders.length > 0 && (
          <table className="w-full mt-4 border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(order.totalAmount / 100)}
                  </td>
                  <td
                    className={`border p-2 font-semibold ${
                      order.status === "completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserOrdersPage;
