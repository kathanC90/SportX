import React, { useState } from "react";
import { Layout, Table, Button, Select, Avatar, Typography, Modal } from "antd";
import { DeleteOutlined, UserOutlined, CrownOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

// Initial Team Data
const initialTeam = [
  { id: 1, name: "John Doe", role: "Admin", avatar: <CrownOutlined style={{ color: "gold" }} /> },
  { id: 2, name: "Jane Smith", role: "User", avatar: <UserOutlined style={{ color: "blue" }} /> },
  { id: 3, name: "Alex Johnson", role: "User", avatar: <UserOutlined style={{ color: "blue" }} /> },
];

const TeamPage = () => {
  const [team, setTeam] = useState(initialTeam);

  // Handle Role Change
  const handleRoleChange = (value, record) => {
    const updatedTeam = team.map((member) =>
      member.id === record.id ? { ...member, role: value } : member
    );
    setTeam(updatedTeam);
  };

  // Handle Delete Member
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to remove this team member?",
      okText: "Yes, Remove",
      okType: "danger",
      onOk: () => {
        setTeam(team.filter((member) => member.id !== id));
      },
    });
  };

  // Table Columns
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (icon) => <Avatar size="large" icon={icon} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <Select defaultValue={role} onChange={(value) => handleRoleChange(value, record)} style={{ width: 120 }}>
          <Option value="Admin">Admin</Option>
          <Option value="User">User</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Sidebar />
      <Layout>
        <AdminNavbar />
        <Content style={{ padding: 24 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <Title level={2} className="text-gray-800 mb-4">
              Team Management
            </Title>
            <Table
              columns={columns}
              dataSource={team}
              rowKey="id"
              pagination={false}
              className="shadow-md rounded-lg"
            />
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeamPage;
