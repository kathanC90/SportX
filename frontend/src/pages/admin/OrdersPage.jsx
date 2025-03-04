import React from "react";
import { Layout, Table, Tag, Typography } from "antd";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";

const { Content } = Layout;
const { Title } = Typography;

const columns = [
  { title: "Order ID", dataIndex: "id", key: "id" },
  { title: "Customer", dataIndex: "customer", key: "customer" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Status", dataIndex: "status", key: "status", render: (status) => <Tag color={status === "Completed" ? "green" : "red"}>{status}</Tag> },
];

const data = [
  { id: "001", customer: "John Doe", amount: "$200", status: "Completed" },
  { id: "002", customer: "Jane Smith", amount: "$120", status: "Pending" },
];

const OrdersPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Title level={2}>Orders</Title>
            <Table columns={columns} dataSource={data} />
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrdersPage;
