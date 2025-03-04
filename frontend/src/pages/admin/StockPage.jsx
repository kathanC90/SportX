import React from "react";
import { Layout, Table, Badge, Typography } from "antd";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";

const { Content } = Layout;
const { Title } = Typography;

const columns = [
  { title: "Product", dataIndex: "name", key: "name" },
  { title: "Stock", dataIndex: "stock", key: "stock", render: (stock) => <Badge count={stock} style={{ backgroundColor: stock < 10 ? "red" : "green" }} /> },
];

const data = [
  { key: "1", name: "Cricket Bat", stock: 12 },
  { key: "2", name: "Basketball", stock: 5 },
];

const StockPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Title level={2}>Stock</Title>
            <Table columns={columns} dataSource={data} />
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StockPage;
