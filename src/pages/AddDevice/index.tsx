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
} from "antd";
import { deviceProp } from "../../propTypes/deviceType";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { addDevice } from "../../app/deviceSlice";
import { userDiaryType } from "../UserDiary";
import { addDiary } from "../../app/diarySlice";
import ConfirmModal from "../../Components/Modal/ConfirmModal";

const { Content } = Layout;
const { Option } = Select;

const AddDevice = () => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [type, setType] = useState("");
  const [logInName, setLogInName] = useState("");
  const [password, setPassword] = useState("");
  const [usingService, setUsingService] = useState<string[]>([]);
  const options: SelectProps["options"] = [];
  const loginUser = useAppSelector((state) => state.auth.login);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const optionData = [
    "Khám tim mạch",
    "Khám phụ khoa",
    "Khám răng hàm mặt",
    "Khám tai mũi họng",
    "Khám hô hấp",
    "Khám tổng quát",
  ];

  for (let i = 0; i < optionData.length; i++) {
    options.push({
      label: optionData[i],
      value: optionData[i],
    });
  }

  const onChangeSelectDevice = (value: string) => {
    setType(value);
  };

  const handleChangeUsingService = (value: string[]) => {
    setUsingService(value);
  };

  const onFinish = (values: deviceProp) => {
    const connect = true;
    const active = true;
    const newDice = { ...values, connect, active };
    const diaryData: userDiaryType = {
      userName: loginUser.user_name,
      action: `Thực hiện thêm thiết bị: ${values.name}`,
    };
    dispatch(addDiary(diaryData));
    dispatch(addDevice(newDice));
    setShowConfirmModal(true);
  };

  return (
    <Content
      style={{
        margin: "24px 16px 0",
        backgroundColor: "#EAEAEC",
      }}
    >
      <h3>Thêm thiết bị</h3>
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
                rules={[
                  { required: true, message: "Vui lòng nhập mã thiết bị!" },
                ]}
              >
                <Input onChange={(e) => setCode(e.target.value)} value={code} />
              </Form.Item>
              <Form.Item
                name="name"
                label="Tên thiết bị"
                rules={[
                  { required: true, message: "Vui lòng nhập tên thiết bị!" },
                ]}
              >
                <Input onChange={(e) => setName(e.target.value)} value={name} />
              </Form.Item>
              <Form.Item
                name="ip_address"
                label="Địa chỉ IP"
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ IP!" },
                ]}
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
                rules={[
                  { required: true, message: "Vui lòng chọn loại thiết bị!" },
                ]}
              >
                <Select
                  placeholder="Chọn loại thiết bị"
                  onChange={onChangeSelectDevice}
                  allowClear
                  value={type}
                >
                  <Option value="kiosk">Kiosk</Option>
                  <Option value="Display Counter">Display Counter</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="login_name"
                label="Tên đăng nhập"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input onChange={(e) => setLogInName} value={logInName} />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
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
              rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
              style={{ width: "100%" }}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={options}
                onChange={handleChangeUsingService}
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
            Thêm thiết bị
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

export default AddDevice;
