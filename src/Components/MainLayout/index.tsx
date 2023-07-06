import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import Headers from "../Headers";
import { JsxElement } from "typescript";
import { ReactNode } from "react";

type mainProp = {
  children: ReactNode;
};

function Main({ children }: mainProp) {
  return (
    <>
      <Layout hasSider>
        <SideBar />
        <Layout
          style={{
            backgroundColor: "#EAEAEC",
            marginLeft: 200,
          }}
          className="site-layout"
        >
          <Headers />
          {children}
        </Layout>
      </Layout>
      <Outlet />
    </>
  );
}

export default Main;
