import React from "react";
import logo from "../../assets/images/logo.png";
import {
  CiGrid42,
  CiMonitor,
  CiSettings,
  CiReceipt,
  CiLogout,
  CiCamera,
} from "react-icons/ci";
import { FaBuffer, FaRegComments, FaBell } from "react-icons/fa";
import { Avatar, Col, Layout, Menu, Row, Form, Input, Badge } from "antd";
import avatar from "../../assets/images/avatar.png";
import "./dashboard.css";

const { Header, Content, Sider } = Layout;
const sideBar = [
  {
    title: "Dashboard",
    icon: CiGrid42,
  },
  {
    title: "Thiết bị",
    icon: CiMonitor,
  },
  {
    title: "Dịch vụ",
    icon: FaRegComments,
  },
  {
    title: "Cấp số",
    icon: FaBuffer,
  },
  {
    title: "Báo cáo",
    icon: CiReceipt,
  },
  {
    title: "Cài đặt hệ thống",
    icon: CiSettings,
  },
];
const DashBoard = () => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#fff" }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical">
          <img src={logo} alt="logo" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sideBar.map((item, index) => ({
            key: String(index + 1),
            icon: React.createElement(item.icon),
            label: item.title,
          }))}
        />
        <div className="logout">
          <span className="icon-logout">
            <CiLogout />
          </span>
          <span>Đăng xuất</span>
        </div>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#EAEAEC" }} className="header">
          <div className="title">Thông tin cá nhân</div>
          <div className="wrapper-avatar">
            <Badge className="bell">
              <FaBell className="bell-icon" />
            </Badge>
            {/* <span className="bell">
              
            </span> */}
            <div className="avatar-img">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="name">
              <span>Xin chào</span>
              <span>Lê Quỳnh Ái Vân</span>
            </div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", backgroundColor: "#EAEAEC" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              backgroundColor: "#ffffff",
            }}
          >
            <Row>
              <Col span={6}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ position: "relative" }}>
                    <Avatar src={avatar} className="avatar-content" />
                    <span className="avatar-icon">
                      <CiCamera />
                    </span>
                  </div>
                  <div>Lê Quỳnh Ái Vân</div>
                </div>
              </Col>
              <Col span={18}>
                <Form
                  size="middle"
                  name="normal_login"
                  initialValues={{ remember: true }}
                  layout="vertical"
                >
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item label="Tên người dùng ">
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item label="Số điện thoại">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Email">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Tên đăng nhập">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Mật khẩu">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Vai trò">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
