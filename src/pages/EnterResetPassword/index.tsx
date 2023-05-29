import React from "react";
import { Button, Form, Input, Col, Row } from "antd";
import logo from "../../assets/images/logo.png";
import "../Login/login.css";
import "../ResetPassword/resetPassword.css";

const EnterResetPassword = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu *"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Xác nhận
              </Button>
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
