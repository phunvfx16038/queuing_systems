import React from "react";
import logo from "../../assets/images/logo.png";
import {
  CiGrid42,
  CiMonitor,
  CiSettings,
  CiReceipt,
  CiLogout,
} from "react-icons/ci";
import { FaBuffer, FaRegComments } from "react-icons/fa";
import { Layout, Menu } from "antd";
import "./sidebar.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const sideBar = [
  {
    title: "Dashboard",
    icon: <CiGrid42 />,
    link: "/dashboard",
  },
  {
    title: "Thiết bị",
    icon: <CiMonitor />,
    link: "/thietbi",
  },
  {
    title: "Dịch vụ",
    icon: <FaRegComments />,
    link: "/dichvu",
  },
  {
    title: "Cấp số",
    icon: <FaBuffer />,
    link: "/capso",
  },
  {
    title: "Báo cáo",
    icon: <CiReceipt />,
    link: "/baocao",
  },
  {
    title: "Cài đặt hệ thống",
    icon: <CiSettings />,
    link: "/caidathethong",
  },
];
const SideBar = () => {
  return (
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
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        {sideBar?.map((item, index) => (
          <Menu.Item key={index} icon={item.icon}>
            <Link to={item.link}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <div className="logout">
        <span className="icon-logout">
          <CiLogout />
        </span>
        <span>Đăng xuất</span>
      </div>
    </Sider>
  );
};

export default SideBar;
