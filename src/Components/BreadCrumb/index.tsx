import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./breadcrumb.css";

const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <Breadcrumb style={{ lineHeight: "unset" }}>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Breadcrumb.Item className="item">
              {capatilize(name)}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item className="item">
              <Link to={`${routeTo}`}>{capatilize(name)}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
