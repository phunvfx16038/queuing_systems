import React, { useState } from "react";
import {
  Layout,
  Select,
  Input,
  Row,
  Col,
  Form,
  Button,
  SelectProps,
  Checkbox,
} from "antd";
import { serviceProp } from "../../propTypes/serviceType";

const { Content } = Layout;
const { TextArea } = Input;

const AddAccount = () => {
  const [randomNumber0To7] = useState<number>(() =>
    Math.floor(Math.random() * 7)
  );

  const onFinish = (values: serviceProp) => {
    console.log(values);
    const active = randomNumber0To7 % 2 === 0 ? true : false;
    // const newDice = { ...values, active };
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
                name="name"
                label="Họ tên"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="role"
                label="Vai trò"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Tất cả"
                  style={{ width: "100%" }}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "accountant", label: "Kế toán" },
                    { value: "manager", label: "Quản lý" },
                    { value: "admin", label: "Admin" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="user_name"
                label="Tên đăng nhập"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="retype"
                label="Nhập lại mật khẩu"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="active"
                label="Tình trạng"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Tất cả"
                  style={{ width: "100%" }}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "true", label: "Hoạt động" },
                    { value: "false", label: "Ngưng hoạt động" },
                  ]}
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
    </Content>
  );
};

export default AddAccount;
