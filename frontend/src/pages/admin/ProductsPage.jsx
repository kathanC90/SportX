import React from "react";
import { Layout, Card, Button, Avatar, Rate, Typography } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import "antd/dist/reset.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const products = [
  { id: 1, name: "Cricket Bat", price: "$120.00", rating: 4.5, reviews: 131, image: "bat.jpg" },
  { id: 2, name: "Table Tennis Paddles", price: "$60.00", rating: 4, reviews: 64, image: "paddles.jpg" },
  { id: 3, name: "Badminton Shuttlecocks", price: "$24.59", rating: 4, reviews: 63, image: "shuttlecock.jpg" },
  { id: 4, name: "Sneakers", price: "$89.10", rating: 4.2, reviews: 95, image: "sneakers.jpg" },
  { id: 5, name: "Tennis Racket", price: "$75.00", rating: 4.3, reviews: 80, image: "racket.jpg" },
  { id: 6, name: "Basketball", price: "$55.00", rating: 4.1, reviews: 78, image: "basketball.jpg" },
];

const ProductsPage = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          {/* Header Section */}
          <div 
            className="flex justify-between items-center mb-6 p-4 rounded-lg shadow-md bg-white"
            style={{ position: "sticky", top: 0, zIndex: 1000 }}
          >
            <Title level={2} className="text-gray-800">Products</Title>
            
            {/* ✅ Always Visible Button */}
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              size="large"
              className="rounded-lg px-6 py-3 font-semibold text-lg"
              style={{
                backgroundColor: "#1890ff", // Ant Design primary color
                color: "#fff",
                border: "none",
                visibility: "visible", // Ensure it's always visible
                opacity: 1,
              }}
            >
              Add New Product
            </Button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: product.id * 0.1 }}
              >
                <Card
                  hoverable
                  cover={
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  }
                  className="shadow-lg rounded-xl overflow-hidden"
                >
                  <Title level={4} className="text-gray-900">{product.name}</Title>
                  <Text className="block text-gray-600 text-lg font-semibold">{product.price}</Text>
                  
                  <div className="flex items-center mt-2">
                    <Rate disabled defaultValue={product.rating} className="text-yellow-500" />
                    <Text className="text-gray-500 ml-2">({product.reviews} reviews)</Text>
                  </div>

                  <Button type="default" icon={<EditOutlined />} className="w-full mt-4">
                    Edit Product
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductsPage;
