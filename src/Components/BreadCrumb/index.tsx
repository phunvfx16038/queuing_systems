import React, { Fragment } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";
import "./breadcrumb.css";
const routes = [
  { path: "/dashboard", breadcrumb: "Dashboard" },
  { path: "/profile", breadcrumb: "Thông tin cá nhân" },
  {
    path: "/thietbi",
    breadcrumb: "Thiết bị",
    children: [
      {
        path: "themthietbi",
        breadcrumb: "Thêm thiết bị",
      },
      {
        path: "chitietthietbi",
        breadcrumb: "Chi tiết",
      },
      {
        path: "capnhatthietbi",
        breadcrumb: "Cập nhật",
      },
    ],
  },
  {
    path: "/dichvu",
    breadcrumb: "Dịch vụ",
    children: [
      {
        path: "themdichvu",
        breadcrumb: "Thêm dịch vụ",
      },
      {
        path: "chitietdichvu",
        breadcrumb: "Chi tiết",
      },
      {
        path: "capnhatdichvu",
        breadcrumb: "Cập nhật",
      },
    ],
  },
  {
    path: "/capso",
    breadcrumb: "Cấp số",
    children: [
      {
        path: "themso",
        breadcrumb: "Cấp số mới",
      },
      {
        path: "chitietcapso",
        breadcrumb: "Chi tiết",
      },
    ],
  },
  {
    path: "/baocao",
    breadcrumb: "Báo cáo",
  },
  {
    path: "/caidathethong",
    breadcrumb: "Cài đặt hệ thống",
    children: [
      {
        path: "quanlyvaitro",
        breadcrumb: "Quản lý vai trò",
        children: [
          {
            path: "themvaitro",
            breadcrumb: "Thêm vai trò",
          },
          {
            path: "capnhatvaitro",
            breadcrumb: "Cập nhật tài khoản",
          },
        ],
      },
      {
        path: "quanlytaikhoan",
        breadcrumb: "Quản lý tài khoản",
        children: [
          {
            path: "themtaikhoan",
            breadcrumb: "Thêm vai trò",
          },
          {
            path: "capnhattaikhoan",
            breadcrumb: "Cập nhật tài khoản",
          },
        ],
      },
      {
        path: "nhatkyhoatdong",
        breadcrumb: "Nhật ký hoạt động",
      },
    ],
  },
];

const BreadCrumb = () => {
  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });
  return (
    <div className="breadcrum">
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <Fragment key={match.pathname}>
          <NavLink to={match.pathname} className="breadcrum-text">
            {breadcrumb}
          </NavLink>
          {index !== breadcrumbs.length - 1 && " > "}
        </Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;
