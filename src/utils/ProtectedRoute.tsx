import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";

const ProtectedRoute = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
