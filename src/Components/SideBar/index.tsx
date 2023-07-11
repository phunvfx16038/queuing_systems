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
import { Layout, Menu, MenuProps } from "antd";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAppDispatch } from "../../app/store";
import { logout } from "../../app/authSlice";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/dashboard">Dashboard</Link>, "dashboard", <CiGrid42 />),
  getItem(<Link to="/thietbi">Thiết bị</Link>, "device", <CiMonitor />),
  getItem(<Link to="/dichvu">Dịch vụ</Link>, "service", <FaRegComments />),
  getItem(<Link to="/capso">Cấp số</Link>, "progression", <FaBuffer />),
  getItem(<Link to="/baocao">Báo cáo</Link>, "report", <CiReceipt />),
  getItem("Cài đặt hệ thống", "setting", <CiSettings />, [
    getItem(
      <Link to="/caidathethong/quanlyvaitro">Quản lý vai trò </Link>,
      "3"
    ),
    getItem(
      <Link to="/caidathethong/quanlytaikhoan">Quản lý tài khoản</Link>,
      "4"
    ),
    getItem(
      <Link to="/caidathethong/nhatkynguoidung">Nhật ký người dùng</Link>,
      "5"
    ),
  ]),
];
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        localStorage.removeItem("user");
        const resetLoginData = {
          displayName: "",
          email: "",
          phone: "",
          photoUrl: "",
          password: "",
          active: true,
          role: "",
          user_name: "",
        };
        const data = {
          resetLoginData,
          isLogin: false,
        };
        dispatch(logout(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Sider
      breakpoint="lg"
      style={{
        backgroundColor: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
      }}
    >
      <div className="demo-logo-vertical">
        <Link to="/dashboard">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ borderRight: 0 }}
        items={items}
      />
      <div className="logout" onClick={handleLogout}>
        <span className="icon-logout">
          <CiLogout />
        </span>
        <span>Đăng xuất</span>
      </div>
    </Sider>
  );
};

export default SideBar;
