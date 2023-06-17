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

const AddRole = () => {
  const [service_code, setServiceCode] = useState("");
  const [service_name, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [autoCount, setAutoCount] = useState(false);
  const [autoCountValue, setAutoCountValue] = useState(0);
  const [autoCountValue1, setAutoCountValue1] = useState(0);
  const [autoCountValue2, setAutoCountValue2] = useState(0);
  const [prefix, setPrefix] = useState(false);
  const [prefixValue, setPrefixValue] = useState(0);
  const [surfix, setSurfix] = useState(false);
  const [surfixValue, setSurfixValue] = useState(0);
  const [reset, setReset] = useState(false);

  const [randomNumber0To7] = useState<number>(() =>
    Math.floor(Math.random() * 7)
  );

  const { TextArea } = Input;

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
      <h3>Danh sách vai trò</h3>
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
              Thông tin vai trò
            </h4>
            <Col span={12}>
              <Form.Item
                name="role_name"
                label="Tên vai trò"
                rules={[{ required: true }]}
                initialValue={service_code}
              >
                <Input placeholder="Nhập tên vai trò" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true }]}
              >
                <TextArea
                  rows={5}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                  value={description}
                />
              </Form.Item>
              <div>
                <span style={{ color: "red" }}>*</span>
                Là trường thông tin bắt buộc
              </div>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Phân quyền chức năng"
                rules={[{ required: true }]}
                initialValue={service_code}
              ></Form.Item>
              <div>
                <h4>Chức năng A</h4>
                <Form.Item>
                  <Checkbox
                    onChange={(e) => setAutoCount(e.target.checked)}
                    checked={autoCount}
                    defaultChecked={autoCount}
                  >
                    Tăng tự động từ
                  </Checkbox>
                </Form.Item>
              </div>
            </Col>
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

export default AddRole;
