import React, { useState } from "react";
import { Button, Form, Input, Col, Row } from "antd";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";
import "./resetPassword.css";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [completeGetEmail, setCompleteGetEmail] = useState<string>("");
  const navigate = useNavigate();
  const cancleReset = () => {
    navigate("/");
  };

  const handleEmailReset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onFinish = async () => {
    return await sendPasswordResetEmail(auth, email)
      .then((data) => {
        // navigate("/enterResetPassword");
        setCompleteGetEmail(
          "Vui lòng kiểm tra Email để được hướng dẫn thay đổi mật khẩu!"
        );
        setErrorEmail("");
      })
      .catch((error) => {
        setErrorEmail("Không tìm thấy địa chỉ Email!");
      });
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
            {completeGetEmail && (
              <div style={{ marginBottom: "10px" }}>{completeGetEmail}</div>
            )}

            <p style={{ marginBottom: "10px" }}>
              Vui lòng nhập email để đặt lại mật khẩu của bạn *
            </p>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "E-mail không đúng định dạng!",
                },
                {
                  required: true,
                  message: "Vui lòng nhập Email!",
                },
              ]}
            >
              <Input onChange={handleEmailReset} value={email} />
            </Form.Item>
            {errorEmail && (
              <div className="errorLogin" style={{ marginBottom: "10px" }}>
                {errorEmail}
              </div>
            )}
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
