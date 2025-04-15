import React, { useState, useEffect } from "react";
import { Layout, Table, Tag, Typography, Card, Select, Spin, message } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/orders/admin/all");
      console.log("Fetched orders:", response.data);  // Log response here
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  

  const handleStatusChange = async (value, orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/admin/${orderId}/status`, { status: value });
  
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: value } : order
      );
      setOrders(updatedOrders);
      message.success(`Order ${orderId} status updated to ${value}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'orange',
      'completed': 'green',
      'failed': 'red',
    };
    return colors[status.toLowerCase()] || 'default';
  };

  const columns = [
    { 
      title: "Order ID", 
      dataIndex: "id", 
      key: "id",
      render: (id) => <span className="font-medium">{id.substring(0, 8)}...</span>
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <span className="font-medium">{userId}</span>
    },
    { 
      title: "Total Amount", 
      dataIndex: "totalAmount", 
      key: "totalAmount",
      render: (totalAmount) => `$${parseFloat(totalAmount).toFixed(2)}`
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>
      )
    },
    { 
      title: "Payment Intent ID", 
      dataIndex: "paymentIntentId", 
      key: "paymentIntentId"
    },
    { 
      title: "Payment ID", 
      dataIndex: "paymentId", 
      key: "paymentId"
    },
    { 
      title: "Payment Date", 
      dataIndex: "paymentDate", 
      key: "paymentDate",
      render: (paymentDate) => paymentDate ? new Date(paymentDate).toLocaleString() : "N/A"
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (shippingAddress) => {
        const address = shippingAddress ? JSON.parse(shippingAddress) : null;
        return address ? (
          <div>
            <p>{address.fullName}</p>
            <p>{address.addressLine1}</p>
            {address.addressLine2 && <p>{address.addressLine2}</p>}
            <p>{address.city}, {address.state} {address.postalCode}</p>
            <p>{address.country}</p>
            <p>Phone: {address.phone}</p>
          </div>
        ) : "No shipping information available";
      }
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => {
        const itemList = items ? JSON.parse(items) : [];
        return (
          <div>
            {itemList.length > 0 ? (
              itemList.map((item, index) => (
                <p key={index}>{item.name} (x{item.quantity})</p>
              ))
            ) : (
              "No items"
            )}
          </div>
        );
      }
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <Title level={2} className="text-gray-800 m-0">
                  Orders Management
                </Title>
                <button
                  onClick={fetchOrders}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={loading}
                >
                  Refresh
                </button>
              </div>
              
              {loading ? (
  <div className="flex justify-center items-center p-12">
    <Spin size="large" />
  </div>
) : orders.length === 0 ? (
  <div>No orders found</div> // Show a message when no orders are found
) : (
  <Table 
    columns={columns} 
    dataSource={Array.isArray(orders) ? orders : []} 
    rowKey="id"
    pagination={{ pageSize: 10 }}
    className="shadow-md rounded-lg"
  />
)}

            </Card>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrdersPage;
