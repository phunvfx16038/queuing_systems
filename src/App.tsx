import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
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

type protectProp = {
  children: JSX.Element;
};

function App() {
  const user = useAppSelector((state) => state.user.user);
  // const ProtectedRoute = ({ children }: protectProp) => {
  //   if (user.email === "") {
  //     return <Navigate to="/" />;
  //   }

  //   return children;
  // };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/enterResetPassword" element={<EnterResetPassword />} />
      </Routes>
      {/* <ProtectedRoute> */}
      <Layout>
        <SideBar />
        <Layout style={{ backgroundColor: "#EAEAEC" }}>
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
          </Routes>
        </Layout>
      </Layout>
      {/* </ProtectedRoute> */}
    </div>
  );
}

export default App;
