import React from "react";
import { Layout, Table, Button, Typography } from "antd";
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
  { title: "Action", key: "action", render: () => <Button icon={<FilePdfOutlined />} type="primary">Download</Button> },
];

const data = [
  { key: "1", id: "INV001", customer: "Alice Brown", total: "$500" },
  { key: "2", id: "INV002", customer: "Bob Martin", total: "$350" },
];

const InvoicePage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Title level={2}>Invoices</Title>
            <Table columns={columns} dataSource={data} />
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InvoicePage;
