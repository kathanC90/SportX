import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Upload, Typography, message } from "antd";
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/getdetail/${id}`);
        const product = response.data;

        // ✅ Ensure ID is set properly
        form.setFieldsValue({
          id: product.id || product.productId,
          name: product.name,
          description: product.description,
          category: product.category,
          brand: product.brand,
          color: product.color,
          size: product.size,
          material: product.material,
          price: product.price,
          rating: product.rating,
        });

        // ✅ Set existing image preview
        if (product.image) {
          setImagePreview(product.image);
        }
      } catch (error) {
        message.error("Failed to fetch product details.");
        navigate("/admin/products");
      }
    };

    fetchProduct();
  }, [id, navigate, form]);

  const handleImageChange = ({ file }) => {
    console.log("Selected image file:", file);
    
    if (file && file.originFileObj) {
      const imageUrl = URL.createObjectURL(file.originFileObj);
      setImagePreview(imageUrl);
      setFileList([file]); // ✅ Store file in fileList
    } else {
      message.error("Please select a valid image.");
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key] !== null && values[key] !== "") {
          formData.append(key, values[key]);
        }
      });

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      message.error("Failed to update product.");
    }
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Title level={3} className="text-gray-800">Edit Product</Title>
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/admin/products")}>
                Back
              </Button>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="Product ID" name="id">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter product name!" }]}>
                <Input placeholder="Enter product name" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter description!" }]}>
                <Input.TextArea placeholder="Enter product description" />
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Input placeholder="Enter category" />
              </Form.Item>
              <Form.Item label="Brand" name="brand">
                <Input placeholder="Enter brand" />
              </Form.Item>
              <Form.Item label="Color" name="color">
                <Input placeholder="Enter color" />
              </Form.Item>
              <Form.Item label="Size" name="size">
                <Input placeholder="Enter size" />
              </Form.Item>
              <Form.Item label="Material" name="material">
                <Input placeholder="Enter material" />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input type="number" placeholder="Enter price" min="0" />
              </Form.Item>
              <Form.Item label="Rating" name="rating">
                <Input type="number" disabled />
              </Form.Item>

              <Form.Item label="Product Image">
                <div className="text-center mb-3">
                  {imagePreview && <img src={imagePreview} alt="Product" style={{ width: 80, height: 80, borderRadius: 10 }} />}
                </div>
                <Upload showUploadList={false} beforeUpload={() => false} onChange={handleImageChange}>
                  <Button icon={<UploadOutlined />}>Upload New Image</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <motion.button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={loading}>
                  <SaveOutlined /> {loading ? "Saving..." : "Save Changes"}
                </motion.button>
              </Form.Item>
            </Form>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditProduct;
