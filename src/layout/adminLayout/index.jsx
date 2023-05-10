import { DownOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import "@/components/Header/header.scss";
import { actLogout } from "@/redux/auth/authSlice";
import { URL_BACKEND } from "@/utils/config";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { data, isAuthenticated } = useSelector((state) => state.auth);
  const URL_AVATAR = `${URL_BACKEND}/images/avatar/${data?.avatar}`;
  const handleLogout = () => {
    dispatch(actLogout());
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Quản lý tài khoản
        </a>
      ),
      key: "0",
    },
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "1",
    },
    {
      label: (
        <Link to="/" onClick={handleLogout}>
          Đăng Xuất
        </Link>
      ),
      key: "2",
    },
  ];
  const renderUserHeader = (user) => {
    if (isAuthenticated) {
      return (
        <Dropdown
          menu={{
            items,
          }}
        >
          <Link
            onClick={(e) => e.preventDefault()}
            className="header__upper-account header__upper-auth"
          >
            <Avatar
              src={URL_AVATAR}
              style={{
                backgroundColor: "#cffdf8",
                color: "#f56a00",
                marginRight: "1rem",
              }}
            />
            {user}
            <DownOutlined />
          </Link>
        </Dropdown>
      );
    } else {
      return (
        <Link className="header__upper-account" to="/login">
          <ShoppingCartOutlined />
          <p>Log in </p>
        </Link>
      );
    }
  };
  return (
    <Fragment>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <img
              src={logo}
              alt="..."
              style={{ width: "50%", height: "60px", objectFit: "cover" }}
            />
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu key="sub1" icon={<FileOutlined />} title="Manage User">
              <Menu.Item key="1" icon={<UserOutlined />}>
                <NavLink to="/admin">CRUD</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileOutlined />} title="Manage Books">
              <Menu.Item key="2" icon={<FileOutlined />}>
                <NavLink to="/admin/books">CRUD</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                textAlign: "right",
                paddingRight: "1rem",
              }}
            >
              {renderUserHeader(data?.fullName)}
            </div>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            ></Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            ©2023
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  );
};
export default AdminLayout;
