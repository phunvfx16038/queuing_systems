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

const { Content } = Layout;
const { Option } = Select;

const EditService = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [type, setType] = useState("");
  const [logInName, setLogInName] = useState("");
  const [password, setPassword] = useState("");
  const [usingService, setUsingService] = useState<string[]>([]);
  const options: SelectProps["options"] = [];

  const [randomNumber0To7] = useState<number>(() =>
    Math.floor(Math.random() * 7)
  );

  const { TextArea } = Input;
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

  const onFinish = () => {
    // const active = randomNumber0To7 % 2 === 0 ? true : false;
    // const newDice = { ...values, active };
  };

  return (
    <Content
      style={{
        margin: "24px 16px 0",
        backgroundColor: "#EAEAEC",
      }}
    >
      <h3>Thêm dịch vụ</h3>
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
              Thông tin dịch vụ
            </h4>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Mã dịch vụ"
                rules={[{ required: true }]}
              >
                <Input onChange={(e) => setCode(e.target.value)} value={code} />
              </Form.Item>
              <Form.Item
                name="name"
                label="Tên dịch vụ"
                rules={[{ required: true }]}
              >
                <Input onChange={(e) => setName(e.target.value)} value={name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["user", "introduction"]} label="Introduction">
                <TextArea rows={5} />
              </Form.Item>
            </Col>
            <Form.Item
              name="using_service"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Checkbox>Tăng tự động từ</Checkbox>
              <Input
                placeholder="0001"
                style={{
                  width: "60px",
                  marginLeft: "15px",
                  marginRight: "10px",
                }}
              />
              đến
              <Input
                placeholder="9999"
                style={{ width: "60px", marginLeft: "10px" }}
              />
            </Form.Item>
            <Form.Item
              name="using_service"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Checkbox>Prefix</Checkbox>
              <Input
                placeholder="0001"
                style={{ width: "60px", marginLeft: "80px" }}
              />
            </Form.Item>
            <Form.Item
              name="using_service"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Checkbox>Surfix</Checkbox>
              <Input
                placeholder="0001"
                style={{ width: "60px", marginLeft: "80px" }}
              />
            </Form.Item>
            <Form.Item
              name="using_service"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Checkbox>Reset mỗi ngày</Checkbox>
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
            Thêm dịch vụ
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default EditService;
