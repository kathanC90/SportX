import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const UserOrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Function to Fetch Orders
  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("http://localhost:5000/api/orders", { withCredentials: true });
      console.log("✅ Orders API Response:", res.data.orders);
      setOrders(res.data.orders);
    } catch (err) {
      console.error("❌ Error Fetching Orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch orders when the page loads
  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

      {/* ✅ Refresh Button */}
      <button
        onClick={fetchOrders}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all mb-4"
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh Orders"}
      </button>

      {/* ✅ Loading Spinner */}
      {loading && <p className="text-gray-600">Loading orders...</p>}

      {/* ✅ Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Display Orders */}
      {!loading && orders.length === 0 && <p className="text-gray-500">No orders found.</p>}

      {!loading && orders.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(order.totalAmount / 100)}
                </td>
                <td className={`border p-2 font-semibold ${order.status === "completed" ? "text-green-600" : "text-red-600"}`}>
                  {order.status}
                </td>
                <td className="border p-2">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrdersPage;
