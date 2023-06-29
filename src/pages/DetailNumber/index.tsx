import React from "react";
import { Col, Layout, Row } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;

const DetailNumber = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEditDevice = () => {};
  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
            color: "#535261",
          }}
        >
          <h3>Thông tin cấp số</h3>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <div className="wrap-detail">
                <label>Họ tên:</label>
                <span>Nguyễn Thị Dung</span>
              </div>
              <div className="wrap-detail">
                <label>Tên dịch vụ:</label>
                <span>Khám tim mạch</span>
              </div>
              <div className="wrap-detail">
                <label>Số thứ tự:</label>
                <span>2001201</span>
              </div>
              <div className="wrap-detail">
                <label>Thời gian cấp:</label>
                <span>14:35 - 07/11/2021</span>
              </div>
              <div className="wrap-detail">
                <label>Hạn sử dụng:</label>
                <span>18:00 - 07/11/2021</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="wrap-detail">
                <label>Nguồn cấp:</label>
                <span>Kiosk</span>
              </div>
              <div className="wrap-detail">
                <label>Trạng thái:</label>
                <span>Đang chờ</span>
              </div>
              <div className="wrap-detail">
                <label>Số điện thoại:</label>
                <span>0987654321</span>
              </div>
              <div className="wrap-detail">
                <label>Địa chỉ Email:</label>
                <span>nguyendung@gmail.com</span>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <div className="add-device" style={{ marginTop: "80px", width: "90px" }}>
        <div className="icon-add-device" onClick={handleEditDevice}>
          <BsArrowReturnLeft />
        </div>
        <div className="text-add-device">Quay lại</div>
      </div>
    </div>
  );
};

export default DetailNumber;
