import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import Headers from "../Headers";
import { JsxElement } from "typescript";
import { ReactNode } from "react";

// type mainProp = {
//   children: ReactNode;
// };

function Main() {
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
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
}

export default Main;
