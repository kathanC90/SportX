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
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  // ✅ Form Submit Handler
  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (fileList.length === 0) {
        message.error("Please upload a product image!");
        setLoading(false);
        return;
      }

      // ✅ Ensure productId is assigned
      if (!values.productId) {
        values.productId = `PROD-${Date.now()}`; // Generate a temporary ID (or fetch from DB)
      }

      const formData = new FormData();

      // ✅ Append all text fields
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // ✅ Append image correctly
      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else {
        message.error("Invalid image file!");
        setLoading(false);
        return;
      }

      console.log("🟡 FormData Key: productId, Value:", values.productId);

      // ✅ Debugging: Log FormData
      for (let pair of formData.entries()) {
        console.log(`🟡 FormData Key: ${pair[0]}, Value:`, pair[1]);
      }

      await axios.post("http://localhost:5000/api/products/createproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      message.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      message.error("Failed to add product");
    } finally {
      setLoading(false);
    }
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
              <Title level={3} className="text-gray-800">Add New Product</Title>
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/admin/products")}>
                Back
              </Button>
            </div>

            <Form layout="vertical" onFinish={onFinish} initialValues={{ productId: "", price: "", name: "" }}>
              {/* ✅ Hidden Input for productId */}
              <Form.Item name="productId" hidden>
                <Input />
              </Form.Item>

              <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter product name!" }]}>
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter product description!" }]}>
                <Input.TextArea placeholder="Enter product description" />
              </Form.Item>

              <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please enter category!" }]}>
                <Input placeholder="Enter category" />
              </Form.Item>

              <Form.Item label="Brand" name="brand" rules={[{ required: true, message: "Please enter brand!" }]}>
                <Input placeholder="Enter brand" />
              </Form.Item>

              <Form.Item label="Color" name="color" rules={[{ required: true, message: "Please enter color!" }]}>
                <Input placeholder="Enter color" />
              </Form.Item>

              <Form.Item label="Size" name="size" rules={[{ required: true, message: "Please enter size!" }]}>
                <Input placeholder="Enter size" />
              </Form.Item>

              <Form.Item label="Material" name="material" rules={[{ required: true, message: "Please enter material!" }]}>
                <Input placeholder="Enter material" />
              </Form.Item>

              <Form.Item label="Price ($)" name="price" rules={[{ required: true, message: "Please enter price!" }]}>
                <Input type="number" placeholder="Enter price" min="0" step="0.01" />
              </Form.Item>

              <Form.Item label="Rating" name="rating" rules={[{ required: true, message: "Please enter rating!" }]}>
                <Input type="number" placeholder="Enter rating" min="0" max="5" step="0.1" />
              </Form.Item>

              {/* ✅ File Upload Component */}
              <Form.Item label="Upload Product Image" required>
                <Upload
                  fileList={fileList}
                  beforeUpload={() => false} // Prevents auto upload
                  listType="picture"
                  maxCount={1}
                  accept="image/png, image/jpeg"
                  onChange={({ fileList }) => {
                    console.log("🟡 File Selected:", fileList);
                    setFileList(fileList);
                  }}
                >
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
