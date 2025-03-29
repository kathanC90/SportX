import React, { useState, useEffect, useCallback } from "react";
import {
  Layout,
  Table,
  Typography,
  Card,
  Alert,
  Select,
  Button,
  Popconfirm,
  message,
} from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingRole, setUpdatingRole] = useState(null);

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/merged`);
      console.log("Fetched Users:", res.data); // Debugging
      setTeam(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load user data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle role change
  const handleRoleChange = async (clerkId, id, newRole) => {
    if (!clerkId || !id) {
      message.warning("Invalid user data");
      return;
    }

    setUpdatingRole(id);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/toggle-role/${id}`,
        { role: newRole },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        message.success("Role updated successfully");
        await fetchUsers();
      } else {
        message.error("Failed to update role");
      }
    } catch (err) {
      console.error("Update role error:", err);
      message.error("Failed to update role. Please try again.");
    } finally {
      setUpdatingRole(null);
    }
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    if (!id) return message.warning("Invalid user data");

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
      message.success("User deleted successfully");
      setTeam((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      message.error("Failed to delete user");
    }
  };

  // Table columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Clerk ID", dataIndex: "clerkId", key: "clerkId" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <Select
          value={role}
          style={{ width: 120 }}
          loading={updatingRole === record.id}
          onChange={(newRole) => handleRoleChange(record.clerkId, record.id, newRole)}
          disabled={!record.clerkId || !record.id}
        >
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
          <Option value="doctor">Doctor</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.id ? (
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">Delete</Button>
          </Popconfirm>
        ) : (
          <span style={{ color: "#999" }}>Not in DB</span>
        ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8", display: "flex" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24, overflowX: "auto" }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <Title level={3}>Team Management</Title>
            {error && <Alert message={error} type="error" className="mb-4" />}
            <Card className="mt-4 shadow-sm">
              <Table
                columns={columns}
                dataSource={team}
                loading={loading}
                rowKey={(record) => record.id || record.clerkId}
                pagination={{ pageSize: 6 }}
                scroll={{ x: "max-content" }}
              />
            </Card>
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeamPage;
