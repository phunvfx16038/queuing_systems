import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Layout, Row, Select, Skeleton } from "antd";
import "./editDevice.css";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { deviceProp } from "../../propTypes/deviceType";
import { EditType, editDevice } from "../../app/deviceSlice";

const { Content } = Layout;
const { Option } = Select;

const EditDevice = () => {
  const location = useLocation();
  const editData = location.state.record;
  const dispatch = useAppDispatch();

  const [id] = useState<string>(editData.id);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [type, setType] = useState("");
  const [logInName, setLogInName] = useState("");
  const [password, setPassword] = useState("");
  const [usingService, setUsingService] = useState<string[]>([]);

  const onChangeSelectTypeDevice = (value: string) => {
    setType(value);
  };

  const onChangeSelectUsingServiceDevice = (value: string[]) => {
    setUsingService(value);
  };

  const onFinish = (values: deviceProp) => {
    const newEditData: EditType = { id, editData: values };
    dispatch(editDevice(newEditData));
  };

  return (
    <Content
      style={{
        margin: "24px 16px 0",
        backgroundColor: "#EAEAEC",
      }}
    >
      <h3>Quản lý thiết bị</h3>
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
              Thông tin thiết bị
            </h4>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Mã thiết bị"
                rules={[{ required: true }]}
                initialValue={editData.code}
              >
                <Input onChange={(e) => setCode(e.target.value)} value={code} />
              </Form.Item>
              <Form.Item
                name="name"
                label="Tên thiết bị"
                rules={[{ required: true }]}
                initialValue={editData.name}
              >
                <Input onChange={(e) => setName(e.target.value)} value={name} />
              </Form.Item>
              <Form.Item
                name="ip_address"
                label="Địa chỉ IP"
                rules={[{ required: true }]}
                initialValue={editData.ip_address}
              >
                <Input
                  onChange={(e) => setIpAddress(e.target.value)}
                  value={ipAddress}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại thiết bị"
                rules={[{ required: true }]}
                initialValue={editData.type}
              >
                <Select
                  placeholder="Chọn loại thiết bị"
                  allowClear
                  onChange={onChangeSelectTypeDevice}
                >
                  <Option value="kiosk">Kiosk</Option>
                  <Option value="Display Counter">Display Counter</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="login_name"
                label="Tên đăng nhập"
                rules={[{ required: true }]}
                initialValue={editData.login_name}
              >
                <Input
                  onChange={(e) => setLogInName(e.target.value)}
                  value={logInName}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true }]}
                initialValue={editData.password}
              >
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Item>
            </Col>
            <Form.Item
              name="using_service"
              label="Dịch vụ sử dụng"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
              initialValue={editData.using_service}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={onChangeSelectUsingServiceDevice}
                value={usingService}
              />
            </Form.Item>
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default EditDevice;
