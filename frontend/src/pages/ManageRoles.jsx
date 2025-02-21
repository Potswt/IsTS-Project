import { useState } from "react";
import {
  Layout,
  Table,
  Select,
  message,
  Avatar,
  Button,
  Modal,
  Input,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;
const { Search } = Input;

const ManageRoles = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      avatar: "https://i.pravatar.cc/150?img=1",
      joinedAt: "2023-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?img=2",
      joinedAt: "2023-02-01",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "super-admin",
      avatar: "https://i.pravatar.cc/150?img=3",
      joinedAt: "2023-03-01",
    },
    // Add more users as needed for testing scrolling
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "user",
      avatar: "https://i.pravatar.cc/150?img=4",
      joinedAt: "2023-04-01",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?img=5",
      joinedAt: "2023-05-01",
    },
    {
      id: 6,
      name: "Eve Foster",
      email: "eve@example.com",
      role: "super-admin",
      avatar: "https://i.pravatar.cc/150?img=6",
      joinedAt: "2023-06-01",
    },
    {
      id: 7,
      name: "Frank Green",
      email: "frank@example.com",
      role: "user",
      avatar: "https://i.pravatar.cc/150?img=7",
      joinedAt: "2023-07-01",
    },
    {
      id: 8,
      name: "Grace Hill",
      email: "grace@example.com",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?img=8",
      joinedAt: "2023-08-01",
    },
    {
      id: 9,
      name: "Hank Ives",
      email: "hank@example.com",
      role: "super-admin",
      avatar: "https://i.pravatar.cc/150?img=9",
      joinedAt: "2023-09-01",
    },
    {
      id: 10,
      name: "Ivy Johnson",
      email: "ivy@example.com",
      role: "user",
      avatar: "https://i.pravatar.cc/150?img=10",
      joinedAt: "2023-10-01",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(
        `http://172.18.43.39:5000/api/manage-roles/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      message.success("Role updated successfully");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to update role");
    }
  };

  const handleDeleteUser = (userId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      onOk: () => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        message.success("User deleted successfully");
      },
    });
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => {
      if (filter === "new") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return new Date(user.joinedAt) > oneMonthAgo;
      }
      return true;
    });

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <Avatar src={text} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleRoleChange(record.id, value)}
          style={{ width: 120 }}>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
          <Option value="super-admin">Super Admin</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          style={{ color: "#f5222d" }}
          type="danger"
          onClick={() => handleDeleteUser(record.id)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          minHeight: 280,
          background: "#fff",
        }}>
        <h1 className="text-2xl font-semibold mb-6">Manage User Roles</h1>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Search
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            value={filter}
            onChange={(value) => setFilter(value)}
            style={{ width: 200 }}>
            <Option value="all">All Users</Option>
            <Option value="new">New Users</Option>
          </Select>
        </div>
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content", y: 450 }}
        />
      </Content>
    </Layout>
  );
};

export default ManageRoles;
