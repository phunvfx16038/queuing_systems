import React, { useState, useEffect } from "react";
import { Button, Form, Input, Col, Row, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./login.css";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { loginUser } from "../../app/authSlice";
import { loginProp } from "../../propTypes/loginType";

const Login = () => {
  const user = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<loginProp>({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (user.isLogin) {
      navigate("/dashboard");
    }
  }, [navigate, user.isLogin]);

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, userName: e.target.value });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, password: e.target.value });
  };

  const onFinish = (values: loginProp) => {
    dispatch(loginUser(values));
  };
  return (
    <Row style={{ height: "100vh" }}>
      <Col span={8} className="left">
        <div className="left-content">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <Form
            size="middle"
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Tên đăng nhập *"
              name="userName"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              ]}
            >
              <Input onChange={onChangeUserName} value={loginData.userName} />
            </Form.Item>
            <Form.Item
              label="Mật khẩu *"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                onChange={onChangePassword}
                value={loginData.password}
              />
            </Form.Item>
            {user.isError && <div className="errorLogin">{user.isError}</div>}
            <Form.Item>
              <Link className="login-form-forgot" to="/resetPassword">
                Quên mật khẩu?
              </Link>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              {user.isLoading ? (
                <Button
                  type="primary"
                  style={{ width: "100px" }}
                  className="login-form-button"
                >
                  <Spin />
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Đăng nhập
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col span={16}>
        <div className="right">
          <div className="text-content">
            <p>Hệ thống</p>
            <p>Quản lý xếp hàng</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
