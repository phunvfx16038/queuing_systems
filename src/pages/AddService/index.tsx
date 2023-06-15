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

const AddService = () => {
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
                name="service_code"
                label="Mã dịch vụ"
                rules={[{ required: true }]}
              >
                <Input
                  onChange={(e) => setServiceCode(e.target.value)}
                  value={service_code}
                />
              </Form.Item>
              <Form.Item
                name="service_name"
                label="Tên dịch vụ"
                rules={[{ required: true }]}
              >
                <Input
                  onChange={(e) => setServiceName(e.target.value)}
                  value={service_name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="description" label="Introduction">
                <TextArea
                  rows={5}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                  value={description}
                />
              </Form.Item>
            </Col>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item name="countAuto" valuePropName="checked">
                <Checkbox
                  onChange={(e) => setAutoCount(e.target.checked)}
                  checked={autoCount}
                  defaultChecked={autoCount}
                >
                  Tăng tự động từ
                </Checkbox>
              </Form.Item>
              <Form.Item name="autoCountValue1">
                <Input
                  placeholder="0001"
                  style={{
                    width: "60px",
                    marginLeft: "15px",
                    marginRight: "10px",
                  }}
                  onChange={(e) => setAutoCountValue1(Number(e.target.value))}
                  value={autoCountValue1}
                />
              </Form.Item>
              đến
              <Form.Item name="autoCountValue2">
                <Input
                  placeholder="9999"
                  style={{ width: "60px", marginLeft: "10px" }}
                  onChange={(e) => setAutoCountValue2(Number(e.target.value))}
                  value={autoCountValue2}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item name="prefix" valuePropName="checked">
                <Checkbox
                  checked={prefix}
                  onChange={(e) => setPrefix(e.target.checked)}
                >
                  Prefix
                </Checkbox>
              </Form.Item>
              <Form.Item name="prefixValue">
                <Input
                  placeholder="0001"
                  style={{ width: "60px", marginLeft: "80px" }}
                  onChange={(e) => setPrefixValue(Number(e.target.value))}
                  value={prefixValue}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item name="surfix" valuePropName="checked">
                <Checkbox
                  onChange={(e) => setSurfix(e.target.checked)}
                  checked={surfix}
                >
                  Surfix
                </Checkbox>
              </Form.Item>
              <Form.Item name="surfixValue">
                <Input
                  placeholder="0001"
                  style={{ width: "60px", marginLeft: "80px" }}
                  onChange={(e) => setSurfixValue(Number(e.target.value))}
                  value={surfixValue}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="reset"
              style={{ width: "100%" }}
              valuePropName="checked"
            >
              <Checkbox
                onChange={(e) => setReset(e.target.checked)}
                checked={reset}
              >
                Reset mỗi ngày
              </Checkbox>
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

export default AddService;
