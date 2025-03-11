import React, { useEffect, useState } from "react";
import { Layout, Typography, Divider, Row, Col, Card, Table, Tag } from "antd";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalSales: 0,
    totalPending: 0,
    deals: []
  });

  useEffect(() => {
    axios.get("/api/admin/stats").then((res) => {
      setStats(res.data);
    }).catch(() => {
      setStats({
        totalUsers: 0,
        totalOrders: 0,
        totalSales: 0,
        totalPending: 0,
        deals: []
      });
    });
  }, []);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Date - Time",
      dataIndex: "dateTime",
    },
    {
      title: "Piece",
      dataIndex: "piece",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => `$${text}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = status === 'Delivered' ? 'green' : status === 'Pending' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const cardStyle = {
    textAlign: "center",
    borderRadius: 12,
    padding: "20px",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  const cardData = [
    { title: "Total Users", value: stats.totalUsers, backgroundColor: "#6c5ce7" },
    { title: "Total Orders", value: stats.totalOrders, backgroundColor: "#0984e3" },
    { title: "Total Sales", value: `$${stats.totalSales || 0}`, backgroundColor: "#00b894" },
    { title: "Total Pending", value: stats.totalPending, backgroundColor: "#e17055" }
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sidebar />

      <Layout style={{ flex: 1 }}>
        <AdminNavbar />

        <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
          <Title level={2} style={{ fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
            Admin Dashboard
          </Title>

          {/* Dashboard Cards */}
          <Row gutter={[24, 24]} justify="center">
            {cardData.map((card, index) => (
              <Col span={6} key={index}>
                <Card
                  hoverable
                  style={{ ...cardStyle, backgroundColor: card.backgroundColor, color: "#fff" }}
                >
                  <Title level={4} style={{ color: "#fff", marginBottom: 5 }}>{card.title}</Title>
                  <p style={{ fontSize: 24, fontWeight: "bold" }}>{card.value}</p>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider style={{ margin: "30px 0" }} />

          {/* Deals Overview */}
          <Title level={3} style={{ fontWeight: "bold", marginBottom: 10 }}>
            Deals Overview
          </Title>
          <Table dataSource={stats.deals} columns={columns} rowKey="id" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
