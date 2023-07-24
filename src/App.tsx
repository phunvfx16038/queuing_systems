import React, { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import EnterResetPassword from "./pages/EnterResetPassword";
import DashBoard from "./pages/dashboard";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useAppDispatch } from "./app/store";
import { checkSignIn } from "./app/authSlice";
import Main from "./Components/MainLayout";
import { onSnapshot } from "firebase/firestore";
import { diaryCollection, getDiarys } from "./app/diarySlice";
import { getProgressions, progressionCollection } from "./app/progressionSlice";
import { deviceCollection, getDevices } from "./app/deviceSlice";
import { getServices, serviceCollection } from "./app/serviceSlice";
import { getUsers, userCollection } from "./app/userSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userStorage = localStorage.getItem("user");
      if (user && userStorage !== null) {
        const uid = user.uid;
        const userLoginData = JSON.parse(userStorage);
        const data = {
          userLoginData,
          isLogin: true,
        };

        dispatch(checkSignIn(data));
      } else {
        // User is signed out
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
        dispatch(checkSignIn(data));
      }
      onSnapshot(diaryCollection, (snapshot) => {
        let data: any = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch(getDiarys(data));
      });
      onSnapshot(progressionCollection, (snapshot) => {
        let data: any = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch(getProgressions(data));
      });
      onSnapshot(deviceCollection, (snapshot) => {
        let data: any = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch(getDevices(data));
      });
      onSnapshot(serviceCollection, (snapshot) => {
        let data: any = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch(getServices(data));
      });
    });
  }, [dispatch]);
  onSnapshot(userCollection, (snapshot) => {
    let data: any = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch(getUsers(data));
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/enterResetPassword" element={<EnterResetPassword />} />
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Main />}>
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
            <Route path="caidathethong">
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
              <Route path="nhatkynguoidung" element={<UserDiary />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
