import React, { useState } from "react";
import { Layout, Form, Select, Button } from "antd";
import "./addNumber.css";
import AddNumberModal from "../../Components/Modal/AddNumberModal";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { addProgression } from "../../app/progressionSlice";
import { serviceProp } from "../../propTypes/serviceType";
import Main from "../../Components/MainLayout";

const { Content } = Layout;

const AddNumber = () => {
  const serviceData = useAppSelector((state) => state.service.service);
  const userData = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [date, setDate] = useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");
  const [countAutoNumber, setCountAutoNumber] = useState(0);
  const [prefixNumber, setPrefixNumber] = useState(0);
  const [surfixNumber, setSurfixNumber] = useState(0);
  const handleSelectService = (value: string) => {
    setSelectValue(value);
  };

  const getNumber = (start: number, end: number) => {
    let count = start;
    if (count === end) {
      count = start;
    }
    count++;
    return count;
  };

  const createOrderNumber = (data: serviceProp) => {
    let stt = "";

    if (data.countAuto === true) {
      if (countAutoNumber === 0) {
        stt =
          data.autoCountValue1.toString() +
          getNumber(data.autoCountValue1, data.autoCountValue2).toString();
        setCountAutoNumber(Number(stt));
      } else {
        stt = (countAutoNumber + 1).toString();
        setCountAutoNumber(Number(stt));
      }
    } else if (data.surfix === true) {
      if (surfixNumber === 0) {
        stt =
          data.autoCountValue1.toString() +
          getNumber(data.autoCountValue1, data.surfixValue).toString();
        setSurfixNumber(Number(stt));
      } else {
        stt = (surfixNumber + 1).toString();
        setSurfixNumber(Number(stt));
      }
    } else if (data.prefix === true) {
      if (prefixNumber === 0) {
        stt =
          data.autoCountValue1.toString() +
          getNumber(data.autoCountValue1, data.prefixValue).toString();
        setPrefixNumber(Number(stt));
      } else {
        stt = (prefixNumber + 1).toString();
        setPrefixNumber(Number(stt));
      }
    }
    return stt;
  };

  const onFinish = (values: any) => {
    const date = new Date();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;

    const startDate =
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      " " +
      day +
      "/" +
      month +
      "/" +
      date.getFullYear();

    const expireDate =
      date.getHours() +
      1 +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      " " +
      day +
      "/" +
      month +
      "/" +
      date.getFullYear();
    const serviceSelected = serviceData.filter(
      (service) =>
        service.description.toLowerCase() ===
          values.select_service.toLowerCase() && service.active === true
    );
    const currentServiceData = serviceSelected[0];
    let stt = createOrderNumber(currentServiceData);

    setOrderNumber(stt);
    setDate(startDate);
    setExpireDate(expireDate);

    const ordinalNumber = {
      stt: stt,
      customer_name: userData[0].displayName,
      service_name: currentServiceData.service_name,
      date: startDate,
      expire_date: expireDate,
      state: "waiting",
      supply: currentServiceData.description,
      phone: userData[0].phone,
      email: userData[0].email,
    };
    dispatch(addProgression(ordinalNumber));
    setShowModal(true);
  };
  return (
    <Main>
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
              rules={[{ required: true, message: "Vui lòng chọn dịch vụ" }]}
            >
              <Select
                placeholder="Chọn dịch vụ"
                style={{ width: "100%" }}
                value={selectValue}
                onChange={handleSelectService}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "Khám phụ khoa", label: "Khám sản phụ khoa" },
                  { value: "Khám răng hàm mặt", label: "Khám răng hàm mặt" },
                  { value: "Khám tai mũi họng", label: "Khám tai mũi họng" },
                  { value: "Khám tổng quát", label: "Khám tổng quát" },
                  { value: "Khám hô hấp", label: "Khám hô hấp" },
                ]}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
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
          <AddNumberModal
            showModal={showModal}
            setShowModal={setShowModal}
            stt={orderNumber}
            date={date}
            expire={expireDate}
            serviceName={selectValue}
          />
        </div>
      </Content>
    </Main>
  );
};

export default AddNumber;
