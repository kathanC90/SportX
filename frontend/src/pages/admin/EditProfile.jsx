// src/pages/admin/EditProfile.js
import React, { useState } from "react";
import { Layout, Form, Input, Button, Select, Upload, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Option } = Select;

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
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 600, padding: 24, background: "#fff", borderRadius: 10, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center" }}>Edit Profile</h2>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <Avatar size={80} src={image} />
              <Upload showUploadList={false} onChange={handleImageChange}>
                <Button type="link" icon={<UploadOutlined />}>Edit Photo</Button>
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
                <Button type="primary" htmlType="submit" block>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditProfile;
