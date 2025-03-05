import React from "react";
import { Layout, Typography, Divider } from "antd";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import DashboardCards from "../../components/admin/DashBoardCards";
import DealsTable from "../../components/admin/DealsTable";

const { Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <Layout style={{ flex: 1, background: "#f5f5f5" }}>
        <AdminNavbar />
        <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
          <Title level={2} style={{ fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
            Dashboard
          </Title>

          {/* Dashboard Cards */}
          <DashboardCards />

          <Divider style={{ margin: "30px 0" }} />

          {/* Deals Section */}
          <Title level={3} style={{ fontWeight: "bold", marginBottom: 10 }}>
            Deals Details
          </Title>
          <DealsTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
