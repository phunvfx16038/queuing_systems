import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import EnterResetPassword from "./pages/EnterResetPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/enterResetPassword" element={<EnterResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
