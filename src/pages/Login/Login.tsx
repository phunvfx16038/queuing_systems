import React, { useState } from "react";
import { Button, Form, Input, Col, Row } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./login.css";
import { loginProp } from "../../dataTypes/loginType";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
const Login = () => {
  const [loginData, setLoginData] = useState<loginProp>({
    email: "",
    password: "",
  });

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, email: e.target.value });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, password: e.target.value });
  };

  const checkLoginAccount = () => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = () => {
    checkLoginAccount();
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
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input onChange={onChangeEmail} value={loginData.email} />
            </Form.Item>
            <Form.Item
              label="Mật khẩu *"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                onChange={onChangePassword}
                value={loginData.password}
              />
            </Form.Item>
            <Form.Item>
              <Link className="login-form-forgot" to="resetPassword">
                Quên mật khẩu?
              </Link>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng nhập
              </Button>
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
