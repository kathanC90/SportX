import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const { Content } = Layout;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialProducts = JSON.parse(localStorage.getItem("products")) || [
    { id: 1, name: "Cricket Bat", price: "120.00", image: "/images/bat.jpg" },
    { id: 2, name: "Table Tennis Paddles", price: "60.00", image: "/images/paddles.jpg" },
    { id: 3, name: "Badminton Shuttlecocks", price: "24.59", image: "/images/shuttlecock.jpg" },
  ];

  const productId = parseInt(id, 10);
  const existingProduct = initialProducts.find((p) => p.id === productId);

  const [formData, setFormData] = useState(existingProduct || { name: "", price: "", image: "" });
  const [imagePreview, setImagePreview] = useState(existingProduct?.image || "");

  useEffect(() => {
    if (!existingProduct) {
      message.error("Product not found!");
      navigate("/admin/products");
    }
  }, [existingProduct, navigate]);

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImagePreview(imageUrl);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = () => {
    const updatedProducts = initialProducts.map((product) =>
      product.id === productId ? { ...product, ...formData } : product
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    message.success("Product updated successfully!");
    navigate("/admin/products");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 600, padding: 24, background: "#fff", borderRadius: 10, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center" }}>Edit Product</h2>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <img src={imagePreview} alt="Product" style={{ width: 80, height: 80, borderRadius: 10 }} />
              <Upload showUploadList={false} onChange={handleImageChange}>
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
                <Button type="primary" onClick={handleSave} block>
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
