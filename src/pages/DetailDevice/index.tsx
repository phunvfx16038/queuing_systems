import React from "react";
import { Col, Layout, Row } from "antd";
import { FaPen } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./detailDevice.css";
const { Content } = Layout;

const DetailDevice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const deviceData = location.state.record;
  const statePassToEdit = {
    record: { ...deviceData },
  };

  const handleEditDevice = () => {
    navigate("/thietbi/capnhatthietbi", {
      replace: true,
      state: statePassToEdit,
    });
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <h3>Quản lý thiết bị</h3>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px 20px 50px 20px",
            borderRadius: "5px",
            color: "#535261",
          }}
        >
          <h3>Thông tin thiết bị</h3>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <div className="wrap-detail">
                <label>Mã thiết bị:</label>
                <span>{deviceData.code}</span>
              </div>
              <div className="wrap-detail">
                <label>Tên thiết bị:</label>
                <span>{deviceData.name}</span>
              </div>
              <div className="wrap-detail">
                <label>Địa chỉ thiết bị:</label>
                <span>{deviceData.ip_address}</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="wrap-detail">
                <label>Loại thiết bị:</label>
                <span>{deviceData.type}</span>
              </div>
              <div className="wrap-detail">
                <label>Tên đăng nhập:</label>
                <span>{deviceData.login_name}</span>
              </div>
              <div className="wrap-detail">
                <label>Mật khẩu:</label>
                <span>{deviceData.password}</span>
              </div>
            </Col>
          </Row>
          <div className="wrap-detail">
            <label>Dịch vụ sử dụng</label>
            <p style={{ marginTop: "15px" }}>
              {deviceData.using_service.toString()}
            </p>
          </div>
        </div>
      </Content>
      <div
        className="add-device"
        style={{ marginTop: "80px", width: "90px", height: "90px" }}
      >
        <div className="icon-add-device" onClick={handleEditDevice}>
          <FaPen />
        </div>
        <div className="text-add-device">Cập nhật thiết bị</div>
      </div>
    </div>
  );
};

export default DetailDevice;
