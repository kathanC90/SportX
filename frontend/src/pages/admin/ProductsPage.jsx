import React, { useState } from "react";
import { Layout, Card, Button, Rate, Typography, Modal, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import "antd/dist/reset.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const initialProducts = [
  { id: 1, name: "Cricket Bat", price: "120.00", rating: 4.5, reviews: 131, image: "/images/bat.jpg", availability: "Available" },
  { id: 2, name: "Table Tennis Paddles", price: "60.00", rating: 4, reviews: 64, image: "/images/paddles.jpg", availability: "Limited" },
  { id: 3, name: "Badminton Shuttlecocks", price: "24.59", rating: 4, reviews: 63, image: "/images/shuttlecock.jpg", availability: "Out of Stock" },
];

const availabilityTag = (status) => {
  const colors = {
    "Available": "green",
    "Limited": "orange",
    "Out of Stock": "red",
  };
  return <Tag color={colors[status]}>{status}</Tag>;
};

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  const handleDelete = (productId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      onOk: () => {
        setProducts(products.filter((product) => product.id !== productId));
      },
    });
  };

  const showDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8", display: "flex" }}>
      <Sidebar />
      <Layout style={{ flex: 1 }}>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div 
            className="flex justify-between items-center mb-6 p-4 rounded-lg shadow-md bg-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Title level={2} className="text-gray-800">Products</Title>
            <motion.button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/add-product")}
            >
              <PlusOutlined /> Add New Product
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.3 }}
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
                  onClick={() => showDetails(product)}
                >
                  <Title level={4}>{product.name}</Title>
                  <Text className="text-gray-600 text-lg font-semibold">${product.price}</Text>
                  <div className="flex items-center mt-2">
                    <Rate disabled defaultValue={product.rating} className="text-yellow-500" />
                    <Text className="ml-2 text-gray-500">({product.reviews} reviews)</Text>
                  </div>
                  <div className="mt-2">{availabilityTag(product.availability)}</div>
                  <div className="flex justify-between mt-4">
                    <motion.button 
                      className="px-3 py-2 bg-gray-200 rounded-md flex items-center gap-1 hover:bg-gray-300 transition-all"
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
                      className="px-3 py-2 bg-red-500 text-white rounded-md flex items-center gap-1 hover:bg-red-600 transition-all"
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
            ))}
          </div>
        </Content>
      </Layout>

      {/* Modal for Product Details */}
      <Modal visible={!!selectedProduct} onCancel={closeModal} footer={null} title="Product Details">
        {selectedProduct && (
          <>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-56 object-cover rounded-md mb-4" />
            <Title level={3}>{selectedProduct.name}</Title>
            <Text className="block text-lg font-semibold">Price: ${selectedProduct.price}</Text>
            <div className="flex items-center mt-2">
              <Rate disabled defaultValue={selectedProduct.rating} className="text-yellow-500" />
              <Text className="ml-2 text-gray-500">({selectedProduct.reviews} reviews)</Text>
            </div>
            <div className="mt-2">Availability: {availabilityTag(selectedProduct.availability)}</div>
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default ProductsPage;
