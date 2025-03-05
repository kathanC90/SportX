import React, { useState } from "react";
import { Layout, Form, Input, Button, Upload, Typography, message } from "antd";
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const { Content } = Layout;
const { Title } = Typography;

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Product added successfully!");
      setLoading(false);
      navigate("/admin/products"); // Redirect to Products page after adding
    }, 1500);
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
            className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
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

              <Form.Item label="Upload Product Image" name="image">
                <Upload beforeUpload={() => false} listType="picture">
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
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
