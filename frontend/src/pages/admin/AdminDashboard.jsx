import React from "react";
import { Layout } from "antd";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import DashboardCards from "../../components/admin/DashBoardCards";
import DealsTable from "../../components/admin/DealsTable";

const { Content } = Layout;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <Layout style={{ flex: 1, background: "#f5f5f5" }}>
        <AdminNavbar />
        <Content style={{ padding: 20 }}>
          <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>Dashboard</h2>
          <DashboardCards />
          <h3 style={{ marginTop: 30, fontWeight: "bold" }}>Deals Details</h3>
          <DealsTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
