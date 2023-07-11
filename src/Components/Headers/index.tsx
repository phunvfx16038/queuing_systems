import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { Layout, Badge, Dropdown, MenuProps } from "antd";
import avatar from "../../assets/images/avatar.png";
import "./header.css";
import BreadCrumb from "../BreadCrumb";
import { useAppSelector } from "../../app/store";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Headers = () => {
  const userLogin = useAppSelector((state) => state.auth.login);
  const logList = useAppSelector((state) => state.diary.diary);
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <Header style={{ backgroundColor: "#EAEAEC" }} className="header">
      <BreadCrumb />
      <div className="wrapper-avatar">
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="dropdown"
        >
          <Badge className="bell" count={logList.length}>
            <FaBell className="bell-icon" />
          </Badge>
          {openDropdown ? (
            <ul className="dropdown-wrap">
              {logList.map((list, index) => (
                <li key={index} className="dropdown-item">
                  {list.action}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="avatar-img">
          <Link to="/userProfile">
            <img src={avatar} alt="avatar" style={{ width: "40px" }} />
          </Link>
        </div>
        <Link to="/userProfile" className="name">
          <span>Xin chào</span>
          <span> {userLogin.displayName}</span>
        </Link>
      </div>
    </Header>
  );
};

export default Headers;
