import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserOrdersPage = () => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    console.log("Fetching orders...");

    if (!isSignedIn) {
      console.log("User not signed in");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      console.log("Orders API response:", response.data);

      const ordersData = Array.isArray(response.data)
        ? response.data
        : response.data?.orders || [];

      if (!Array.isArray(ordersData)) {
        throw new Error("Invalid orders data format");
      }

      setOrders(ordersData);

      if (ordersData.length === 0) {
        toast.info("No orders found");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error ||
                           err.response?.data?.message ||
                           err.message || "Failed to load orders";
      console.error("Order fetch error:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, getToken]);

  // Fetch order details
  const fetchOrderDetails = useCallback(async (orderId) => {
    if (!isSignedIn) return;
    
    try {
      const token = await getToken();
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setSelectedOrder(response.data);
    } catch (err) {
      toast.error("Failed to load order details");
      console.error("Order details fetch error:", err);
    }
  }, [isSignedIn, getToken]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Close order details modal
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // Format date string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <button
            onClick={fetchOrders}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh Orders"}
          </button>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
              <button onClick={fetchOrders} className="text-red-700 underline mt-2">
                Try Again
              </button>
            </div>
          )}

          {!loading && orders.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-700">No orders found</h3>
              <p className="mt-2 text-gray-500">
                {isSignedIn ? "You haven't placed any orders yet." : "Please sign in to view orders."}
              </p>
            </div>
          )}

          {!loading && orders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => fetchOrderDetails(order.id)}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-3xl w-full max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Order Details</h3>
                <button 
                  onClick={closeOrderDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{selectedOrder.id}</span>
                </div>
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Date:</span>
                  <span>{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    selectedOrder.status === 'completed' ? 'text-green-600' :
                    selectedOrder.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Payment ID:</span>
                  <span>{selectedOrder.paymentId || 'N/A'}</span>
                </div>
              </div>
              
              {selectedOrder.shippingAddress && (
                <div className="border-b pb-4 mb-4">
                  <h4 className="font-bold mb-2">Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress.fullName}</p>
                  <p>{selectedOrder.shippingAddress.addressLine1}</p>
                  {selectedOrder.shippingAddress.addressLine2 && (
                    <p>{selectedOrder.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                  <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                </div>
              )}
              
              <div className="mt-4">
                <h4 className="font-bold mb-2">Order Summary</h4>
                <div className="border-t border-b py-2 mb-2 font-semibold flex justify-between">
                  <span>Total Amount:</span>
                  <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={closeOrderDetails}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserOrdersPage;