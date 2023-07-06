import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import EnterResetPassword from "./pages/EnterResetPassword";
import DashBoard from "./pages/dashboard";
import { useAppDispatch, useAppSelector } from "./app/store";
import UserProfile from "./pages/UserProfile";
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
import EditRole from "./pages/EditRole";
import ManageAccount from "./pages/ManageAccount";
import AddAccount from "./pages/AddAccount";
import EditAccount from "./pages/EditAccount";
import UserDiary from "./pages/UserDiary";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/enterResetPassword" element={<EnterResetPassword />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
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
          <Route path="quanlyvaitro">
            <Route index element={<Managerole />} />
            <Route path="themvaitro" element={<AddRole />} />
            <Route path="capnhatvaitro" element={<EditRole />} />
          </Route>
          <Route path="quanlytaikhoan">
            <Route index element={<ManageAccount />} />
            <Route path="themtaikhoan" element={<AddAccount />} />
            <Route path="capnhattaikhoan" element={<EditAccount />} />
          </Route>
          <Route path="/nhatkynguoidung" element={<UserDiary />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
