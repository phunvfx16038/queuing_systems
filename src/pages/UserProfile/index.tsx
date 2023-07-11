import React from "react";
import { CiCamera } from "react-icons/ci";
import { Avatar, Col, Layout, Row, Form, Input } from "antd";
import avatar from "../../assets/images/avatar.png";
import "./userProfile.css";
import { useAppSelector } from "../../app/store";
import Main from "../../Components/MainLayout";

const { Content } = Layout;

const UserProfile = () => {
  const userProfile = useAppSelector((state) => state.auth.login);
  return (
    <Content style={{ margin: "24px 16px 0", backgroundColor: "#EAEAEC" }}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          backgroundColor: "#ffffff",
        }}
      >
        <Row>
          <Col span={6}>
            <div style={{ textAlign: "center" }}>
              <div style={{ position: "relative" }}>
                <Avatar
                  src={avatar || userProfile.photoUrl}
                  className="avatar-content"
                />
                <span className="avatar-icon">
                  <CiCamera />
                </span>
              </div>
              <div>{userProfile.displayName || "Lê Quỳnh Ái Vân"}</div>
            </div>
          </Col>
          <Col span={18}>
            <Form
              size="middle"
              name="normal_login"
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item label="Tên người dùng ">
                    <Input readOnly value={userProfile.displayName} />
                  </Form.Item>
                  <Form.Item label="Số điện thoại">
                    <Input readOnly value={userProfile.phone} />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input readOnly value={userProfile.email} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên đăng nhập">
                    <Input readOnly value={userProfile.user_name} />
                  </Form.Item>
                  <Form.Item label="Mật khẩu">
                    <Input readOnly value={userProfile.password} />
                  </Form.Item>
                  <Form.Item label="Vai trò">
                    <Input readOnly value={userProfile.role} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default UserProfile;
