import { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import {
  TableOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  MessageOutlined,
  PieChartOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../assets/jib-logo-2.png";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import NotiFications from "./NotiFications";

const { Header, Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <LayoutOutlined />,
    label: <NavLink to="/">Overview</NavLink>,
  },
  {
    key: "2",
    icon: <TableOutlined />,
    label: <NavLink to="/table">Issues Table</NavLink>,
  },
  {
    key: "3",
    icon: <MessageOutlined />,
    label: <NavLink to="/messages">Messages</NavLink>,
  },
  {
    key: "4",
    icon: <PieChartOutlined />,
    label: <NavLink to="/reports">Reports</NavLink>,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    if (location.pathname === "/settings") {
      setSelectedKey("");
    } else {
      const menuItem = menuItems.find(
        (item) => item.label.props.to === location.pathname
      );
      setSelectedKey(menuItem ? menuItem.key : "1");
    }
  }, [location]);

  const accountdropdown = [
    {
      key: "1",
      label: (
        <NavLink
          to="/settings"
          style={{ display: "flex", alignItems: "center" }}>
          <SettingOutlined />
          <span style={{ marginLeft: "8px" }}>Settings</span>
        </NavLink>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <a href="login" style={{ display: "flex", alignItems: "center" }}>
          <LogoutOutlined />
          <span style={{ marginLeft: "8px" }}>Logout</span>
        </a>
      ),
    },
  ];

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="65"
        className="bg-white"
        width={200}>
        <div className="logo-container mt-6">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <Menu
          style={{ marginTop: "25px" }}
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 0",
            backgroundColor: "#262362",
            zIndex: 1000,
          }}>
          <div className="flex ml-auto">
            <NotiFications className="mr-5" />
          </div>
          <div className="flex mr-5">
            <Dropdown menu={{ items: accountdropdown }}>
              <a
                onClick={(e) => e.preventDefault()}
                style={{ marginLeft: "16px" }}>
                <Space className="text-white">
                  <Avatar />
                  name
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ padding: "16px", overflow: "auto" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          JIB ©{getCurrentYear()} Created by JIB
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
