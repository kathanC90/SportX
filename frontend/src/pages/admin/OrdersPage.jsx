import React, { useState } from "react";
import { Layout, Table, Tag, Typography, Card, Select } from "antd";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    { id: "001", customer: "John Doe", amount: "$200", status: "Approved" },
    { id: "002", customer: "Jane Smith", amount: "$120", status: "Pending" },
    { id: "003", customer: "Mike Johnson", amount: "$300", status: "Cancelled" },
  ]);

  const handleStatusChange = (value, record) => {
    const updatedOrders = orders.map((order) =>
      order.id === record.id ? { ...order, status: value } : order
    );
    setOrders(updatedOrders);
  };

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(value, record)}
          className="w-32"
        >
          <Option value="Pending">
            <Tag color="orange">Pending</Tag>
          </Option>
          <Option value="Approved">
            <Tag color="green">Approved</Tag>
          </Option>
          <Option value="Cancelled">
            <Tag color="red">Cancelled</Tag>
          </Option>
        </Select>
      ),
    },
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
            <Card className="shadow-lg p-6 rounded-xl">
              <Title level={2} className="text-gray-800 mb-4">
                Orders
              </Title>
              <Table columns={columns} dataSource={orders} className="shadow-md rounded-lg" rowKey="id" />
            </Card>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrdersPage;
