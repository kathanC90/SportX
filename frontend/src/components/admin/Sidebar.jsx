import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, ShoppingOutlined, DollarOutlined, ClockCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider theme="light">
      <div className="logo" style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>SPORT X</div>
      <Menu mode="vertical" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <NavLink to="/admin">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingOutlined />}>
          <NavLink to="/admin/products">Products</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<DollarOutlined />}>
          <NavLink to="/admin/orders">Orders</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileTextOutlined />}> {/* Updated for Invoices */}
          <NavLink to="/admin/invoice">Invoices</NavLink>
        </Menu.Item>
        <Menu.Item key="5" icon={<ClockCircleOutlined />}>
          <NavLink to="/admin/stock">Stock</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
