import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axios from "axios";

const { Content } = Layout;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", price: "", image: null });
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/getdetail/${id}`);
        const product = response.data;
        setFormData({ name: product.name, price: product.price, image: null });
        setImagePreview(product.image); 
      } catch (error) {
        message.error("Failed to fetch product details.");
        navigate("/admin/products");
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleImageChange = ({ file }) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file.originFileObj);
      setImagePreview(imageUrl);
      setFormData((prev) => ({ ...prev, image: file.originFileObj }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedProductData = new FormData();
      updatedProductData.append("name", formData.name);
      updatedProductData.append("price", formData.price);
      
      if (formData.image) {
        updatedProductData.append("image", formData.image);
      }
  
      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProductData, {
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 600,
              padding: 24,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Edit Product</h2>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              {imagePreview && <img src={imagePreview} alt="Product" style={{ width: 80, height: 80, borderRadius: 10 }} />}
              <Upload showUploadList={false} beforeUpload={() => false} onChange={handleImageChange}>
                <Button type="link" icon={<UploadOutlined />}>Edit Photo</Button>
              </Upload>
            </div>
            <Form layout="vertical">
              <Form.Item label="Product Name">
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </Form.Item>
              <Form.Item label="Price ($)">
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={handleSave}
                  block
                  loading={loading}
                  disabled={loading}
                >
                  Save Changes
                </Button>
                <Button style={{ marginTop: 8 }} onClick={() => navigate("/admin/products")} block>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditProduct;
