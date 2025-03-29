import React, { useState, useEffect } from "react";
import { Layout, Card, Button, Rate, Typography, Modal, Tag, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const { Content } = Layout;
const { Title, Text } = Typography;

const availabilityTag = (status) => {
  const colors = {
    "Available": "green",
    "Limited": "orange",
    "Out of Stock": "red",
  };
  return <Tag color={colors[status]}>{status}</Tag>;
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/fetch");
      console.log("Fetched Products:", response.data); // ✅ Debugging API response
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    if (!productId) {
      console.error("Invalid product ID:", productId);
      return;
    }
    console.log("Editing product with ID:", productId); // ✅ Debugging ID
    navigate(`/admin/edit-product/${productId}`);
  };

  const handleDelete = async (id) => {
    console.log(`🛑 Deleting product: ${id}`);
  
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete product");
      }
  
      console.log("✅ Product deleted successfully");
      // Refresh product list after deletion
      fetchProducts();
    } catch (error) {
      console.error("❌ Error deleting product:", error.message);
    }
  };
  
  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8", display: "flex" }}>
      <Sidebar />
      <Layout style={{ flex: 1 }}>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div
            className="flex items-center justify-between p-4 mb-6 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Title level={2} className="text-gray-800">Products</Title>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 text-white transition-all bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/add-product")}
            >
              <PlusOutlined /> Add New Product
            </motion.button>
          </motion.div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {products.map((product) => {
                return (
                  <motion.div key={product.id}>
                    <Card
                      hoverable
                      cover={
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-48 rounded-t-xl"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      }
                      className="overflow-hidden shadow-lg rounded-xl"
                    >
                      <Title level={4}>{product.name}</Title>
                      <Text className="text-lg font-semibold text-gray-600">${product.price}</Text>
                      <div className="flex items-center mt-2">
                        <Rate disabled defaultValue={product.rating} className="text-yellow-500" />
                        <Text className="ml-2 text-gray-500">({product.reviews} reviews)</Text>
                      </div>
                      <div className="mt-2">{availabilityTag(product.availability)}</div>
                      <div className="flex justify-between mt-4">
                        <motion.button
                          className="flex items-center gap-1 px-3 py-2 transition-all bg-gray-200 rounded-md hover:bg-gray-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(product.id);
                          }}
                        >
                          <EditOutlined /> Edit
                        </motion.button>
                        <motion.button
                          className="flex items-center gap-1 px-3 py-2 text-white transition-all bg-red-500 rounded-md hover:bg-red-600"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(product.id);
                          }}
                        >
                          <DeleteOutlined /> Delete
                        </motion.button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductsPage;
