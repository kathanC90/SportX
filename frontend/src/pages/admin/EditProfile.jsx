import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Upload, Avatar, Card, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dicncqzvu/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const DEFAULT_IMAGE = "https://via.placeholder.com/150"; // ✅ Default image URL

const EditProfile = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Automatically fetch user data
  useEffect(() => {
    axios.get("http://localhost:5000/api/user/profile", { withCredentials: true })
      .then(response => {
        const { firstName, lastName, profileImage } = response.data;

        // ✅ Set fetched data
        setUserData(response.data);
        setImage(profileImage || DEFAULT_IMAGE);  // ✅ Set default image if none

        // ✅ Automatically fill form fields
        form.setFieldsValue({
          firstName: firstName,
          lastName: lastName
        });
      })
      .catch(error => {
        message.error("Failed to fetch user data");
        console.error("Failed to fetch user data", error);
      });
  }, [form]);

  // ✅ Handle Image Upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      setLoading(true);
      const response = await axios.post(CLOUDINARY_URL, formData);
      const uploadedImageUrl = response.data.secure_url;
      
      // ✅ Update state and DB
      setImage(uploadedImageUrl);
      await updateProfileImage(uploadedImageUrl);
      setLoading(false);
      message.success("Image uploaded successfully");
    } catch (error) {
      setLoading(false);
      message.error("Failed to upload image");
      console.error("Upload error", error);
    }
  };

  // ✅ Handle File Upload Change
  const handleImageChange = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      handleImageUpload(file);
    }
  };

  // ✅ Update Profile Image in DB
  const updateProfileImage = async (imageUrl) => {
    try {
      await axios.put("http://localhost:5000/api/user/profile/image", 
        { profileImage: imageUrl }, 
        { withCredentials: true }
      );
      message.success("Profile image updated successfully");
    } catch (error) {
      message.error("Failed to update profile image");
      console.error("Update image error", error);
    }
  };

  // ✅ Handle Form Submission
  const onFinish = (values) => {
    const formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      profileImage: image,
    };

    axios.put("http://localhost:5000/api/user/profile", formData, { withCredentials: true })
      .then(() => {
        message.success("Profile updated successfully");
        navigate("/admin");
      })
      .catch(error => {
        message.error("Failed to update profile");
        console.error("Update error", error);
      });
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

              {/* ✅ Profile Image */}
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <Avatar size={90} src={image} />
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                >
                  <Button
                    type="link"
                    icon={<UploadOutlined />}
                    style={{ fontSize: "16px" }}
                    loading={loading}
                  >
                    {loading ? "Uploading..." : "Change Photo"}
                  </Button>
                </Upload>
              </div>

              {/* ✅ Profile Form */}
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Enter your first name" }]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Enter your last name" }]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>

                <Form.Item>
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
