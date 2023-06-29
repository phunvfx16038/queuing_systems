import React, { useState, useEffect } from "react";
import { Button, Form, Input, Col, Row } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./login.css";
import { loginProp } from "../../dataTypes/loginType";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { loginUser } from "../../app/userSlice";

const Login = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<loginProp>({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (user.user.email !== "") {
  //     navigate("/userProfile");
  //   }
  // }, [user, navigate]);

  console.log(user);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, email: e.target.value });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, password: e.target.value });
  };

  const onFinish = () => {
    dispatch(loginUser(loginData));
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
            {user.isError && <div className="errorLogin">{user.isError}</div>}
            <Form.Item>
              <Link className="login-form-forgot" to="resetPassword">
                Quên mật khẩu?
              </Link>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              {user.isLoading ? (
                <Button
                  type="primary"
                  style={{ width: "100px" }}
                  icon={<PoweroffOutlined />}
                  loading
                  className="login-form-button"
                />
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
