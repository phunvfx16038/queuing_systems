import React, { useState } from "react";
import { Layout, Select, Input, Row, Col, Form, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { createNewUser } from "../../app/userSlice";
import { userType } from "../../propTypes/userType";
import { userDiaryType } from "../UserDiary";
import { addDiary } from "../../app/diarySlice";
import ConfirmModal from "../../Components/Modal/ConfirmModal";

const { Content } = Layout;

const AddAccount = () => {
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector((state) => state.auth.login);

  const handleChangeRole = (value: string) => {
    setRole(value);
  };

  const handleChangeActive = (value: string) => {
    setActive(value);
  };

  const onFinish = (values: userType) => {
    const diaryData: userDiaryType = {
      userName: loginUser.user_name,
      action: `Thực hiện tạo tài khoản mới: ${values.user_name}`,
    };
    dispatch(createNewUser(values));
    dispatch(addDiary(diaryData));
    setShowConfirmModal(true);
  };

  return (
    <Content
      style={{
        margin: "24px 16px 0",
        backgroundColor: "#EAEAEC",
      }}
    >
      <h3>Quản lý tài khoản</h3>
      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px 20px 50px 20px",
            borderRadius: "5px",
          }}
        >
          <Row gutter={[16, 16]}>
            <h4 style={{ fontSize: "20px", display: "block", width: "100%" }}>
              Thông tin tài khoản
            </h4>
            <Col span={12}>
              <Form.Item
                name="displayName"
                label="Họ tên"
                rules={[{ required: true, message: "Vui lòng nhập Họ tên!" }]}
              >
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="role"
                label="Vai trò"
                rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
              >
                <Select
                  placeholder="Tất cả"
                  style={{ width: "100%" }}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "Kế toán", label: "Kế toán" },
                    { value: "Quản lý", label: "Quản lý" },
                    { value: "Admin", label: "Admin" },
                  ]}
                  value={role}
                  onChange={handleChangeRole}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="user_name"
                label="Tên đăng nhập"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="retype"
                label="Nhập lại mật khẩu"
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
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="active"
                label="Tình trạng"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái!" },
                ]}
              >
                <Select
                  placeholder="Tất cả"
                  style={{ width: "100%" }}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: true, label: "Hoạt động" },
                    { value: false, label: "Ngưng hoạt động" },
                  ]}
                  value={active}
                  onChange={handleChangeActive}
                />
              </Form.Item>
            </Col>

            <div>
              <span style={{ color: "red" }}>*</span>
              Là trường thông tin bắt buộc
            </div>
          </Row>
        </div>
        <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button cancle"
          >
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
      <ConfirmModal
        type="add"
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
      />
    </Content>
  );
};

export default AddAccount;
