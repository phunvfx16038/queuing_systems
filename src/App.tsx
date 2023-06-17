import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import EnterResetPassword from "./pages/EnterResetPassword";
import DashBoard from "./pages/dashboard";
import { useAppSelector } from "./app/store";
import UserProfile from "./pages/UserProfile";
import { Layout } from "antd";
import SideBar from "./Components/SideBar";
import Headers from "./Components/Headers";
import Device from "./pages/Device";
import AddDevice from "./pages/AddDevice";
import DetailDevice from "./pages/DetailDevice";
import EditDevice from "./pages/EditDevice";
import Service from "./pages/Service";
import AddService from "./pages/AddService";
import DetailService from "./pages/DetailService";
import EditService from "./pages/EditService";
import Progression from "./pages/Progression";
import AddNumber from "./pages/AddNumber";
import DetailNumber from "./pages/DetailNumber";
import Report from "./pages/Report";
import Managerole from "./pages/ManageRole";
import AddRole from "./pages/AddRole";

type protectProp = {
  children: JSX.Element;
};

function App() {
  const location = useLocation();
  const pathName = location.pathname;
  const user = useAppSelector((state) => state.user.user);
  // const ProtectedRoute = ({ children }: protectProp) => {
  //   if (pathName === "/resetPassword") {
  //     return <Navigate to="/resetPassword" />;
  //   } else if (pathName === "/enterResetPassword") {
  //     return <Navigate to="/enterResetPassword" />;
  //   } else if (user.email === "") {
  //     return <Navigate to="/" />;
  //   }
  //   return children;
  // };
  return (
    <div className="App">
      <Routes>
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/enterResetPassword" element={<EnterResetPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
      {/* <ProtectedRoute> */}
      <Layout hasSider>
        <SideBar />
        <Layout
          style={{ backgroundColor: "#EAEAEC", marginLeft: 200 }}
          className="site-layout"
        >
          <Headers />
          <Routes>
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="thietbi">
              <Route index element={<Device />} />
              <Route path="themthietbi" element={<AddDevice />} />
              <Route path="chitietthietbi" element={<DetailDevice />} />
              <Route path="capnhatthietbi" element={<EditDevice />} />
            </Route>
            <Route path="dichvu">
              <Route index element={<Service />} />
              <Route path="themdichvu" element={<AddService />} />
              <Route path="chitietdichvu" element={<DetailService />} />
              <Route path="capnhatdichvu" element={<EditService />} />
            </Route>
            <Route path="capso">
              <Route index element={<Progression />} />
              <Route path="themso" element={<AddNumber />} />
              <Route path="chitietcapso" element={<DetailNumber />} />
            </Route>
            <Route path="/baocao" element={<Report />} />
            <Route path="/quanlyvaitro" element={<Managerole />} />
            <Route path="/themvaitro" element={<AddRole />} />
          </Routes>
        </Layout>
      </Layout>
      {/* </ProtectedRoute> */}
    </div>
  );
}

export default App;
