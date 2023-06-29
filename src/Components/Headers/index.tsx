import React from "react";
import { FaBell } from "react-icons/fa";
import { Layout, Badge } from "antd";
import avatar from "../../assets/images/avatar.png";
import "./header.css";
import BreadCrumb from "../BreadCrumb";
import { useAppSelector } from "../../app/store";

const { Header } = Layout;

const Headers = () => {
  // const userLogin = useAppSelector((state) => state.user.user);
  return (
    <Header style={{ backgroundColor: "#EAEAEC" }} className="header">
      <BreadCrumb />
      <div className="wrapper-avatar">
        <Badge className="bell">
          <FaBell className="bell-icon" />
        </Badge>
        <div className="avatar-img">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="name">
          <span>Xin chào</span>
          <span> Lê Quỳnh Ái Vân</span>
        </div>
      </div>
    </Header>
  );
};

export default Headers;
