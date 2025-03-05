import React from "react";
import { Layout, Menu, Image, Typography } from "antd";
import { 
  UserOutlined, 
  ShoppingOutlined, 
  DollarOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined, 
  TeamOutlined 
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const location = useLocation(); // Get current route path

  return (
    <Sider theme="light">
      {/* Logo and Name */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          padding: "20px", 
          gap: "12px" 
        }}
      >
        <Image 
          src="/images/sportx-logo.png" 
          alt="SportX Logo" 
          width={40} 
          height={40} 
          preview={false} 
          style={{ borderRadius: "50%" }}
        />
        
      <div className="logo" style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}>SPORT X</div>
      </div>

      <Menu mode="vertical" selectedKeys={[location.pathname]}>
        <Menu.Item key="/admin" icon={<UserOutlined />}>
          <NavLink to="/admin">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="/admin/products" icon={<ShoppingOutlined />}>
          <NavLink to="/admin/products">Products</NavLink>
        </Menu.Item>
        <Menu.Item key="/admin/orders" icon={<DollarOutlined />}>
          <NavLink to="/admin/orders">Orders</NavLink>
        </Menu.Item>
        <Menu.Item key="/admin/invoice" icon={<FileTextOutlined />}>
          <NavLink to="/admin/invoice">Invoices</NavLink>
        </Menu.Item>
        <Menu.Item key="/admin/availability" icon={<CheckCircleOutlined />}>
          <NavLink to="/admin/availability">Availability</NavLink>
        </Menu.Item>
        <Menu.Item key="/admin/team" icon={<TeamOutlined />}>
          <NavLink to="/admin/team">Team</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
