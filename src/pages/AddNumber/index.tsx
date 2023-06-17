import React, { useState } from "react";
import { Layout, Form, Select, Button } from "antd";
import "./addNumber.css";

const { Content } = Layout;
const { Option } = Select;
const AddNumber = () => {
  const onFinish = (values: any) => {};

  return (
    <Content
      style={{
        margin: "24px 16px 0",
        backgroundColor: "#EAEAEC",
      }}
    >
      <h3>Quản lý cấp số</h3>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px 20px 50px 20px",
          borderRadius: "5px",
        }}
      >
        <Form
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          style={{
            width: "400px",
            margin: "30px auto",
            textAlign: "center",
          }}
        >
          <h3>Cấp số mới</h3>
          <Form.Item
            label="Dịch vụ khách hàng lựa chọn"
            name="select_service"
            style={{ width: "100%" }}
            className="add-number"
          >
            <Select
              placeholder="Chọn dịch vụ"
              style={{ width: "100%" }}
              options={[
                { value: "all", label: "Tất cả" },
                { value: "gynecological", label: "Khám sản phụ khoa" },
                { value: "teeth", label: "Khám răng hàm mặt" },
                { value: "otolaryngology", label: "Khám tai mũi họng" },
                { value: "general", label: "Khám tổng quát" },
                { value: "respiratory", label: "Khám hô hấp" },
              ]}
            />
          </Form.Item>
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
              style={{ width: "100px" }}
            >
              In số
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default AddNumber;
