import React, { useState } from "react";
import { Layout, Form, Input, Button, Select, Upload, Avatar, Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImage(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const onFinish = (values) => {
    console.log("Saved Profile:", values);
    navigate("/admin"); // Redirect to Admin Dashboard
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 24 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: 500 }}
          >
            <Card className="shadow-lg p-6 rounded-xl bg-white">
              <Title level={2} className="text-center mb-4">
                Edit Profile
              </Title>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <Avatar size={90} src={image} />
                <Upload showUploadList={false} onChange={handleImageChange}>
                  <Button type="link" icon={<UploadOutlined />} style={{ fontSize: "16px" }}>
                    Change Photo
                  </Button>
                </Upload>
              </div>
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Enter your first name" }]}>
                  <Input placeholder="Enter your first name" />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Enter your last name" }]}>
                  <Input placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item label="Your Email" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
                  <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item label="Phone Number" name="phone">
                  <Input placeholder="Enter your phone number" />
                </Form.Item>
                <Form.Item label="Position" name="position">
                  <Input defaultValue="CEO" disabled />
                </Form.Item>
                <Form.Item label="Gender" name="gender">
                  <Select defaultValue="Male">
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  {/* Directly applying motion.button to avoid hover visibility issues */}
                  <motion.button
                    type="submit"
                    className="ant-btn ant-btn-primary ant-btn-block"
                    style={{
                      fontSize: "16px",
                      padding: "10px",
                      width: "100%",
                      backgroundColor: "#1890ff",
                      color: "#fff",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save Changes
                  </motion.button>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditProfile;
