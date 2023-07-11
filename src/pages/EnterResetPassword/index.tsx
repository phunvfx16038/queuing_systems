import React, { useState } from "react";
import { Button, Form, Input, Col, Row, Spin } from "antd";
import logo from "../../assets/images/logo.png";
import "../Login/login.css";
import "../ResetPassword/resetPassword.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { confirmPasswordReset } from "firebase/auth";

const EnterResetPassword = () => {
  const navigate = useNavigate();
  // const pathname = useLocation();
  // const data = pathname.search.split("&");
  // const code = data[1].split("=")[1];
  const [searchParams] = useSearchParams();
  let oobCode: string | null = searchParams.get("oobCode");
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      if (oobCode) {
        await confirmPasswordReset(auth, oobCode, values.password);
        setIsLoading(true);
        navigate("/login");
      } else {
        window.alert("Something is wrong; try again later!");
        console.log("missing oobCode");
      }
    } catch (error: any) {
      console.log(error.message);
    }
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
            <div className="title-reset">Đặt lại mật khẩu mới</div>
            <Form.Item
              label="Mật khẩu *"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu *"
              name="retype"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              {isLoading ? (
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
                  Xác nhận
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col span={16}>
        <div className="right-resetPW"></div>
      </Col>
    </Row>
  );
};

export default EnterResetPassword;
