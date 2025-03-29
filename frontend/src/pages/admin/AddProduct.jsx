import React, { useState } from "react";
import { Layout, Form, Input, Button, Upload, Typography, message } from "antd";
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to save product to the backend
  const saveProduct = async (productData) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      if (productData.image) {
        formData.append("image", productData.image); // Append the image file
      }

      const response = await axios.post("http://localhost:5000/api/products/createproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Assuming the response contains a success flag
    } catch (error) {
      throw new Error("Error saving product");
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const productData = {
        name: values.name,
        price: values.price,
        image: values.image?.fileList[0]?.originFileObj, // Image from Upload field
      };
      await saveProduct(productData);
      message.success("Product added successfully!");
      navigate("/admin/products"); // Redirect to Products page after adding
    } catch (error) {
      message.error("Failed to add product");
    }
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8", display: "flex" }}>
      <Sidebar />
      <Layout style={{ flex: 1 }}>
        <AdminNavbar />
        <Content style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Title level={3} className="text-gray-800">
                Add New Product
              </Title>
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/admin/products")}>
                Back
              </Button>
            </div>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter product name!" }]}>
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item label="Price ($)" name="price" rules={[{ required: true, message: "Please enter price!" }]}>
                <Input type="number" placeholder="Enter price" />
              </Form.Item>

              <Form.Item label="Upload Product Image" name="image" rules={[{ required: true, message: "Please upload an image!" }]}>
                <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <motion.button
                  type="submit"
                  className="flex items-center justify-center w-full gap-2 py-2 text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                >
                  <SaveOutlined />
                  {loading ? "Saving..." : "Save Product"}
                </motion.button>
              </Form.Item>
            </Form>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddProduct;
