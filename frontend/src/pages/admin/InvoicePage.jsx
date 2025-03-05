import React from "react";
import { Layout, Table, Button, Typography, Card, Tag } from "antd";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";
import { FilePdfOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const columns = [
  { title: "Invoice ID", dataIndex: "id", key: "id" },
  { title: "Customer", dataIndex: "customer", key: "customer" },
  { title: "Total", dataIndex: "total", key: "total" },
  {
    title: "Payment Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Paid" ? "green" : status === "Pending" ? "orange" : "red"}>
        {status}
      </Tag>
    ),
  },
  { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
  { title: "Mode of Payment", dataIndex: "paymentMode", key: "paymentMode" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="primary"
          icon={<FilePdfOutlined />}
          style={{
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            fontWeight: "bold",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Download
        </Button>
      </motion.div>
    ),
  },
];

const data = [
  {
    key: "1",
    id: "INV001",
    customer: "Alice Brown",
    total: "$500",
    status: "Pending",
    paymentDate: "2025-02-20",
    paymentMode: "Credit Card",
  },
  {
    key: "2",
    id: "INV002",
    customer: "Bob Martin",
    total: "$350",
    status: "Paid",
    paymentDate: "2025-02-18",
    paymentMode: "Bank Transfer",
  },
];

const InvoicePage = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg p-6 rounded-xl">
              <Title level={2} className="text-gray-800 mb-4">
                Invoices & Payments
              </Title>
              <Table columns={columns} dataSource={data} className="shadow-md rounded-lg" />
            </Card>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InvoicePage;
