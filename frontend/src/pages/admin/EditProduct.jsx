import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Upload, Typography, message, Spin, Select } from "antd";
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState(["S", "M", "L", "XL", "XXL"]);
  const [colors, setColors] = useState(["Red", "Blue", "Green", "Black", "White"]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setProductLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/getdetail/${id}`);
        const product = response.data;
        console.log("Fetched product:", product);

        // Set form values
        form.setFieldsValue({
          productId: product.id || product.productId,
          name: product.name,
          description: product.description,
          category: product.category,
          brand: product.brand,
          color: product.color,
          size: product.size,
          material: product.material,
          price: product.price,
          rating: product.rating,
          stock: product.stock || 0,
        });

        // Set image preview
        if (product.image) {
          setImagePreview(product.image);
        }

        // Fetch categories for dropdown
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        message.error("Failed to fetch product details");
      } finally {
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, [id, form]);

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
    
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const imageUrl = URL.createObjectURL(fileList[0].originFileObj);
      setImagePreview(imageUrl);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(values).forEach((key) => {
        if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      // Debugging form data
      console.log("Form values:", values);
      for (let pair of formData.entries()) {
        console.log(`FormData Key: ${pair[0]}, Value:`, pair[1]);
      }

      // Append image if changed
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      const response = await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update response:", response.data);
      message.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      message.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (productLoading) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
        <Sidebar />
        <Layout>
          <AdminNavbar />
          <Content style={{ padding: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spin size="large" />
          </Content>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Title level={3} className="text-gray-800">Edit Product</Title>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate("/admin/products")}
              >
                Back
              </Button>
            </div>

            <Form 
              form={form} 
              layout="vertical" 
              onFinish={onFinish}
            >
              {/* Hidden Product ID field */}
              <Form.Item name="productId" hidden>
                <Input />
              </Form.Item>

              <Form.Item 
                label="Product Name" 
                name="name" 
                rules={[{ required: true, message: "Please enter product name!" }]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item 
                label="Description" 
                name="description" 
                rules={[{ required: true, message: "Please enter product description!" }]}
              >
                <Input.TextArea 
                  placeholder="Enter product description" 
                  rows={4}
                />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item 
                  label="Category" 
                  name="category"
                >
                  <Select placeholder="Select category">
                    {categories.map(cat => (
                      <Option key={cat} value={cat}>{cat}</Option>
                    ))}
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  label="Brand" 
                  name="brand"
                >
                  <Input placeholder="Enter brand" />
                </Form.Item>

                <Form.Item 
                  label="Color" 
                  name="color"
                >
                  <Select placeholder="Select color">
                    {colors.map(color => (
                      <Option key={color} value={color}>{color}</Option>
                    ))}
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  label="Size" 
                  name="size"
                >
                  <Select placeholder="Select size">
                    {sizes.map(size => (
                      <Option key={size} value={size}>{size}</Option>
                    ))}
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  label="Material" 
                  name="material"
                >
                  <Input placeholder="Enter material" />
                </Form.Item>

                <Form.Item 
                  label="Price ($)" 
                  name="price"
                  rules={[{ required: true, message: "Please enter price!" }]}
                >
                  <Input 
                    type="number" 
                    placeholder="Enter price" 
                    min="0" 
                    step="0.01" 
                  />
                </Form.Item>

                <Form.Item 
                  label="Stock" 
                  name="stock"
                >
                  <Input 
                    type="number" 
                    placeholder="Enter stock quantity" 
                    min="0" 
                  />
                </Form.Item>

                <Form.Item 
                  label="Rating" 
                  name="rating"
                >
                  <Input 
                    type="number" 
                    placeholder="Enter rating" 
                    disabled 
                  />
                </Form.Item>
              </div>

              <Form.Item label="Product Image">
                <div className="flex flex-col items-center mb-4">
                  {imagePreview && (
                    <img 
                      src={imagePreview} 
                      alt="Product" 
                      className="object-cover w-32 h-32 mb-3 rounded-lg shadow"
                    />
                  )}
                  <Upload
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleImageChange}
                    maxCount={1}
                    accept="image/png, image/jpeg, image/jpg"
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Upload New Image</Button>
                  </Upload>
                </div>
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
                  {loading ? "Saving..." : "Save Changes"}
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