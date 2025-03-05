import React from "react";
import { Layout, Table, Badge, Typography, Card } from "antd";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";

const { Content } = Layout;
const { Title } = Typography;

const columns = [
  { title: "Product", dataIndex: "name", key: "name" },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
    render: (stock) => (
      <Badge
        count={stock}
        style={{
          backgroundColor: stock < 10 ? "#f5222d" : "#52c41a",
          color: "white",
        }}
      />
    ),
  },
];

const data = [
  { key: "1", name: "Cricket Bat", stock: 12 },
  { key: "2", name: "Basketball", stock: 5 },
  { key: "3", name: "Football", stock: 20 },
  { key: "4", name: "Tennis Racket", stock: 8 },
];

const StockPage = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg p-6 rounded-xl">
              <Title level={2} className="text-gray-800 mb-4">
                Stock Management
              </Title>
              <Table columns={columns} dataSource={data} className="shadow-md rounded-lg" />
            </Card>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StockPage;
