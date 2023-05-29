import React from "react";
import { Button, Form, Input, Col, Row } from "antd";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";
import "./resetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const cancleReset = () => {
    navigate("/");
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    navigate("/enterResetPassword");
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
            <div className="title-reset">Đặt lại mật khẩu</div>
            <Form.Item
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <p>Vui lòng nhập email để đặt lại mật khẩu của bạn *</p>
              <Input />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button cancle"
                onClick={cancleReset}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Tiếp tục
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

export default ResetPassword;
