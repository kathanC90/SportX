import React, { useState } from "react";
import { Layout, Dropdown, Menu, Avatar, Typography, Divider, Input } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const AdminNavbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuClick = (key) => {
    if (key === "profile") {
      navigate("/admin/edit-profile");
    } else if (key === "logout") {
      console.log("Logging out...");
      navigate("/");
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
        <Menu.Item key="profile" icon={<UserOutlined />}>Profile</Menu.Item>
        <Divider style={{ margin: "5px 0" }} />
        <Menu.Item key="logout" icon={<LogoutOutlined />} danger>Logout</Menu.Item>
      </Menu>
    </motion.div>
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

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
      {/* Animated Search Box */}
      <motion.div
        whileFocus={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f5f5f5",
          borderRadius: "8px",
          padding: "5px 12px",
          width: "50%",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <SearchOutlined style={{ fontSize: 18, color: "#888" }} />
        <Input
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products, orders, users..."
          style={{
            border: "none",
            background: "transparent",
            marginLeft: 10,
            width: "100%",
            outline: "none",
            fontSize: "16px",
          }}
        />
      </motion.div>

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
