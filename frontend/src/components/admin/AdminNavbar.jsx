import React from "react";
import { Layout, Dropdown, Menu, Avatar, Typography, Divider } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    if (key === "profile") {
      navigate("/admin/edit-profile"); // Navigate to Edit Profile
    } else if (key === "logout") {
      // Handle logout (Clear session, Redirect to login)
      console.log("Logging out...");
      navigate("/"); // Redirect to login page
    }
  };

  const menuItems = (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Menu onClick={({ key }) => handleMenuClick(key)}>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Divider style={{ margin: "5px 0" }} />
        <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
          Logout
        </Menu.Item>
      </Menu>
    </motion.div>
  );

  return (
    <Header
      style={{
        background: "#fff",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Search Bar */}
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="text"
        placeholder="Search..."
        style={{
          padding: "8px 15px",
          width: "50%",
          borderRadius: "5px",
          border: "1px solid #ddd",
          outline: "none",
          transition: "0.2s ease-in-out",
        }}
      />

      {/* Profile Dropdown */}
      <Dropdown overlay={menuItems} trigger={["click"]}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ marginRight: 10, backgroundColor: "#1890ff" }}
          />
          <Text strong>Vishal K.</Text>
          <DownOutlined style={{ marginLeft: 8 }} />
        </motion.div>
      </Dropdown>
    </Header>
  );
};

export default AdminNavbar;
