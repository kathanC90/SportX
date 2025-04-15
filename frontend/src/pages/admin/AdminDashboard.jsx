import React, { useState, useEffect } from "react";
import { 
  Layout, 
  Card, 
  Statistic, 
  Table, 
  Typography, 
  Spin,
  Progress,
  Divider 
} from "antd";
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  DollarOutlined, 
  InboxOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { Line } from "recharts";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const { Content } = Layout;
const { Title } = Typography;

// Recharts components
import {
  LineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    ordersByStatus: {},
    recentOrders: [],
    salesData: [],
    topProducts: []
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/admin/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data if API is not available
  const getSampleData = () => {
    const fallbackSalesData = [
      { name: 'Jan', sales: 4000 },
      { name: 'Feb', sales: 3000 },
      { name: 'Mar', sales: 5000 },
      { name: 'Apr', sales: 2780 },
      { name: 'May', sales: 1890 },
      { name: 'Jun', sales: 2390 },
      { name: 'Jul', sales: 3490 },
    ];

    const fallbackTopProducts = [
      { name: "Cricket Bat", sales: 123, revenue: 6150 },
      { name: "Football", sales: 98, revenue: 4900 },
      { name: "Basketball", sales: 75, revenue: 3750 },
      { name: "Tennis Racket", sales: 62, revenue: 4340 },
    ];

    const fallbackRecentOrders = [
      { id: "ORD-001", customer: "John Doe", amount: 250, status: "completed" },
      { id: "ORD-002", customer: "Sarah Smith", amount: 120, status: "pending" },
      { id: "ORD-003", customer: "Mike Brown", amount: 340, status: "processing" },
      { id: "ORD-004", customer: "Lisa Chen", amount: 190, status: "completed" },
    ];

    return {
      salesData: stats.salesData?.length > 0 ? stats.salesData : fallbackSalesData,
      topProducts: stats.topProducts?.length > 0 ? stats.topProducts : fallbackTopProducts,
      recentOrders: stats.recentOrders?.length > 0 ? stats.recentOrders : fallbackRecentOrders,
      ordersByStatus: stats.ordersByStatus || { 
        pending: 12, processing: 8, completed: 32, delivered: 24, cancelled: 4 
      }
    };
  };

  const { salesData, topProducts, recentOrders, ordersByStatus } = getSampleData();

  const recentOrderColumns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Amount", dataIndex: "amount", key: "amount", render: (amount) => `$${amount}` },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => {
        const colors = {
          pending: "orange",
          processing: "blue",
          completed: "green",
          delivered: "cyan",
          cancelled: "red"
        };
        return (
          <span 
            className="px-2 py-1 text-xs font-semibold rounded-full"
            style={{ 
              backgroundColor: colors[status] + '20', 
              color: colors[status],
              textTransform: 'capitalize'
            }}
          >
            {status}
          </span>
        );
      }
    },
  ];

  const topProductColumns = [
    { title: "Product", dataIndex: "name", key: "name" },
    { title: "Units Sold", dataIndex: "sales", key: "sales" },
    { 
      title: "Revenue", 
      dataIndex: "revenue", 
      key: "revenue",
      render: (revenue) => `$${revenue}`
    },
  ];

  // Calculate total number of orders from status breakdown
  const calculateTotalOrders = () => {
    return Object.values(ordersByStatus).reduce((sum, value) => sum + value, 0);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <Title level={2} className="mb-6">Dashboard</Title>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="shadow-md">
                    <Statistic
                      title="Total Sales"
                      value={stats.totalSales || 24560}
                      prefix={<DollarOutlined />}
                      valueStyle={{ color: "#3f8600" }}
                      suffix={<ArrowUpOutlined style={{ fontSize: '16px', color: '#3f8600' }} />}
                    />
                    <div className="mt-2 text-sm text-gray-500">+12% from last month</div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="shadow-md">
                    <Statistic
                      title="Total Orders"
                      value={stats.totalOrders || calculateTotalOrders()}
                      prefix={<ShoppingCartOutlined />}
                      valueStyle={{ color: "#1890ff" }}
                    />
                    <div className="mt-2 text-sm text-gray-500">+8% from last month</div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="shadow-md">
                    <Statistic
                      title="Total Customers"
                      value={stats.totalCustomers || 1250}
                      prefix={<UserOutlined />}
                      valueStyle={{ color: "#722ed1" }}
                    />
                    <div className="mt-2 text-sm text-gray-500">+5% from last month</div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card className="shadow-md">
                    <Statistic
                      title="Products (Low Stock)"
                      value={stats.totalProducts || 342}
                      prefix={<InboxOutlined />}
                      suffix={
                        <span className="text-red-500 text-xs ml-2">
                          ({stats.lowStockProducts || 18})
                        </span>
                      }
                      valueStyle={{ color: "#13c2c2" }}
                    />
                    <div className="mt-2 text-sm text-gray-500">+3 products this week</div>
                  </Card>
                </motion.div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Card title="Sales Overview" className="shadow-md">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <Card title="Order Status" className="shadow-md">
                    <div className="flex flex-col gap-3">
                      {Object.entries(ordersByStatus).map(([status, count]) => (
                        <div key={status}>
                          <div className="flex justify-between mb-1">
                            <span className="capitalize">{status}</span>
                            <span>{count}</span>
                          </div>
                          <Progress 
                            percent={Math.round((count / calculateTotalOrders()) * 100)} 
                            showInfo={false}
                            strokeColor={
                              status === 'completed' ? '#52c41a' :
                              status === 'delivered' ? '#13c2c2' :
                              status === 'pending' ? '#faad14' :
                              status === 'processing' ? '#1890ff' :
                              '#f5222d'
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Tables Section */}
              <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Card title="Recent Orders" className="shadow-md">
                    <Table 
                      columns={recentOrderColumns} 
                      dataSource={recentOrders}
                      pagination={{ pageSize: 5 }}
                      rowKey="id"
                      size="small"
                    />
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Card title="Top Selling Products" className="shadow-md">
                    <Table 
                      columns={topProductColumns} 
                      dataSource={topProducts}
                      pagination={false}
                      rowKey="name"
                      size="small"
                    />
                  </Card>
                </motion.div>
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;