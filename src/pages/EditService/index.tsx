import React, { useState } from "react";
import { Layout, Select, Input, Row, Col, Form, Button, Checkbox } from "antd";
import { useLocation } from "react-router-dom";
import { serviceProp } from "../../propTypes/serviceType";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { editService } from "../../app/serviceSlice";
import { userDiaryType } from "../UserDiary";
import { addDiary } from "../../app/diarySlice";
import ConfirmModal from "../../Components/Modal/ConfirmModal";

const { Content } = Layout;
const { TextArea } = Input;

const EditService = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const editData = location.state.record;
  const loginUser = useAppSelector((state) => state.auth.login);
  const [serviceCode, setServiceCode] = useState(editData.service_code);
  const [serviceName, setServiceName] = useState(editData.service_name);
  const [description, setDescription] = useState(editData.description);
  const [autoCount, setAutoCount] = useState(editData.countAuto);
  const [autoCountValue1, setAutoCountValue1] = useState(
    editData.autoCountValue1
  );
  const [autoCountValue2, setAutoCountValue2] = useState(
    editData.autoCountValue2
  );
  const [prefix, setPrefix] = useState(editData.prefix);
  const [prefixValue, setPrefixValue] = useState(editData.prefixValue);
  const [surfix, setSurfix] = useState(editData.surfix);
  const [surfixValue, setSurfixValue] = useState(editData.surfixValue);
  const [reset, setReset] = useState(editData.reset);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const onFinish = (values: serviceProp) => {
    let newService = { ...values };
    if (prefix === false) {
      setPrefixValue(0);
      newService = { ...values, prefixValue };
    }

    if (surfix === false) {
      setSurfixValue(0);
      newService = { ...values, surfixValue };
    }
    const diaryData: userDiaryType = {
      userName: loginUser.user_name,
      action: `Thực hiện cập nhật dịch vụ: ${values.service_name}`,
    };
    dispatch(addDiary(diaryData));
    dispatch(editService({ id: editData.id, editData: newService }));
    setShowConfirmModal(true);
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
                name="serviceCode"
                label="Mã dịch vụ"
                rules={[
                  { required: true, message: "Vui lòng nhập mã dịch vụ!" },
                ]}
                initialValue={serviceCode}
              >
                <Input
                  onChange={(e) => setServiceCode(e.target.value)}
                  value={serviceCode}
                />
              </Form.Item>
              <Form.Item
                name="serviceName"
                label="Tên dịch vụ"
                rules={[
                  { required: true, message: "Vui lòng nhập tên dịch vụ!" },
                ]}
                initialValue={serviceName}
              >
                <Input
                  onChange={(e) => setServiceName(e.target.value)}
                  value={serviceName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="introduction"
                label="Introduction"
                initialValue={description}
              >
                <TextArea
                  rows={5}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                name="autoCount"
                valuePropName="checked"
                initialValue={autoCount}
              >
                <Checkbox
                  onChange={(e) => setAutoCount(e.target.checked)}
                  checked={autoCount}
                  defaultChecked={autoCount}
                  value={autoCount}
                >
                  Tăng tự động từ
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="autoCountValue1"
                initialValue={autoCount ? autoCountValue1 : 0}
              >
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
              <Form.Item
                name="autoCountValue2"
                initialValue={autoCount ? autoCountValue2 : 0}
              >
                <Input
                  placeholder="9999"
                  style={{ width: "60px", marginLeft: "10px" }}
                  onChange={(e) => setAutoCountValue2(Number(e.target.value))}
                  value={autoCountValue2}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                name="prefix"
                valuePropName="checked"
                initialValue={prefix}
              >
                <Checkbox
                  checked={prefix}
                  onChange={(e) => setPrefix(e.target.checked)}
                >
                  Prefix
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="prefixValue"
                initialValue={prefix ? prefixValue : 0}
              >
                <Input
                  placeholder="0001"
                  style={{ width: "60px", marginLeft: "80px" }}
                  onChange={(e) => setPrefixValue(Number(e.target.value))}
                  value={prefixValue}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                name="surfix"
                valuePropName="checked"
                initialValue={surfix}
              >
                <Checkbox
                  onChange={(e) => setSurfix(e.target.checked)}
                  checked={surfix}
                >
                  Surfix
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="surfixValue"
                initialValue={surfix ? surfixValue : 0}
              >
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
              initialValue={reset}
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
      <ConfirmModal
        type="edit"
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
      />
    </Content>
  );
};

export default EditService;
