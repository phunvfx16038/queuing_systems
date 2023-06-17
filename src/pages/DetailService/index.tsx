import React from "react";
import { DatePicker, Input, Layout, Select, Table } from "antd";
import { FaPen } from "react-icons/fa";
import { BsArrowReturnLeft } from "react-icons/bs";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;
type tableProp = {
  order: number;
  state: string;
};
const dateFormat = "YYYY/MM/DD";
const dataSource = [
  {
    order: 2012001,
    state: "Đã hoàn thành",
  },
  {
    order: 2012001,
    state: "Đã thực hiện",
  },
  {
    order: 2012001,
    state: "Vắng",
  },
  {
    order: 2012001,
    state: "Vắng",
  },
  {
    order: 2012001,
    state: "Đã hoàn thành",
  },
  {
    order: 2012001,
    state: "Đã thực hiện",
  },
  {
    order: 2012001,
    state: "Đã hoàn thành",
  },
];

const DetailService = () => {
  const columns: ColumnsType<tableProp> = [
    {
      title: "Số thứ tự",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      render: (state) =>
        state === "Đã hoàn thành" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle active"></div>
            <div>Đã hoàn thành</div>
          </div>
        ) : state === "Đã thực hiện" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle working"></div>
            <div>Đã thực hiện</div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle absent"></div>
            <div>Vắng</div>
          </div>
        ),
    },
  ];
  const navigate = useNavigate();
  const navigateToAddService = () => {
    navigate("/dichvu/themdichvu");
  };

  const backToPreviousPage = () => {
    navigate(-1);
  };
  const onSearch = (value: string) => {};
  return (
    <Content
      style={{
        margin: "24px 0",
        backgroundColor: "#EAEAEC",
      }}
    >
      <h3>Quản lý dịch vụ</h3>
      {/* Service Information */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px 20px 50px 20px",
            borderRadius: "5px",
            color: "#535261",
            height: "95vh",
            width: "30%",
            marginRight: "37px",
            boxSizing: "unset",
          }}
        >
          <h3>Thông tin dịch vụ</h3>
          <div className="wrap-detail">
            <label>Mã dịch vụ:</label>
            <span>Kio_32</span>
          </div>
          <div className="wrap-detail">
            <label>Tên dịch vụ:</label>
            <span>Kiosk</span>
          </div>
          <div className="wrap-detail">
            <label>Mô tả:</label>
            <span>Chuyên các bệnh về tim</span>
          </div>
          <h3>Quy tắc cấp số</h3>
          <div className="wrap-detail">
            <label>Tăng tự động:</label>
            <span
              style={{
                padding: "5px",
                marginRight: "10px",
                border: "1px solid #D4D4D7",
                borderRadius: "5px",
              }}
            >
              0001
            </span>
            <span>đến</span>
            <span
              style={{
                marginLeft: "10px",
                border: "1px solid #D4D4D7",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              9999
            </span>
          </div>
          <div className="wrap-detail" style={{ marginTop: "10px" }}>
            <label>Prefix:</label>
            <span
              style={{
                padding: "5px",
                border: "1px solid #D4D4D7",
                borderRadius: "5px",
                marginLeft: "50px",
              }}
            >
              0001
            </span>
          </div>
          <div className="wrap-detail">
            <label>Reset mỗi ngày</label>
          </div>
          <div>Ví dụ: 201-2001</div>
        </div>
        {/* Table Service */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px 20px 50px 20px",
            borderRadius: "5px",
            color: "#535261",
            height: "95vh",
            width: "55%",
            marginRight: "15px",
          }}
        >
          <div className="wrap-device">
            <div className="wrap-select">
              <div className="select" style={{ width: "180px" }}>
                <label>Trạng thái</label>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Tất cả"
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "completed", label: "Đã hoàn thành" },
                    { value: "worked", label: "Đã thực hiện" },
                    { value: "absent", label: "Vắng" },
                  ]}
                />
              </div>
              <div className="select" style={{ width: "180px" }}>
                <label>Chọn thời gian</label>
                <RangePicker
                  style={{ width: "100%" }}
                  defaultValue={[
                    dayjs("2015/01/01", dateFormat),
                    dayjs("2015/01/01", dateFormat),
                  ]}
                  format={dateFormat}
                />
              </div>
            </div>
            <div style={{ width: "33%" }}>
              <label>Từ khóa</label>
              <Search
                placeholder="Nhập từ khóa"
                allowClear
                onSearch={onSearch}
                style={{ width: "200px" }}
              />
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            style={{ marginTop: "15px" }}
          />
        </div>
        <div style={{ width: "7%" }}>
          <div className="add-device" style={{ marginTop: 0 }}>
            <div className="icon-add-device" onClick={navigateToAddService}>
              <FaPen />
            </div>
            <div className="text-add-device">Thêm dịch vụ</div>
          </div>
          <div className="add-device" style={{ marginTop: "15px" }}>
            <div className="icon-add-device" onClick={backToPreviousPage}>
              <BsArrowReturnLeft />
            </div>
            <div className="text-add-device">Quay lại</div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default DetailService;
