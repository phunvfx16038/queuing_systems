import React, { useEffect, useState } from "react";
import { Layout, Select, Input, Table, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { onSnapshot } from "firebase/firestore";
import { serviceProp } from "../../propTypes/serviceType";
import dayjs from "dayjs";
const { Content } = Layout;
const { Search } = Input;
const dataSource = [
  {
    service_code: "KIO_01",
    service_name: "Kiosk",
    description: "Mô tả dịch vụ 1",
    active: true,
  },
  {
    service_code: "KIO_01",
    service_name: "Kiosk",
    description: "Mô tả dịch vụ 1",
    active: true,
  },
  {
    service_code: "KIO_01",
    service_name: "Kiosk",
    description: "Mô tả dịch vụ 1",
    active: false,
  },
  {
    service_code: "KIO_01",
    service_name: "Kiosk",
    description: "Mô tả dịch vụ 1",
    active: true,
  },
  {
    service_code: "KIO_01",
    service_name: "Kiosk",
    description: "Mô tả dịch vụ 1",
    active: false,
  },
  {
    service_code: "KIO_01",
    service_name: "Kiosk",
    description: "Mô tả dịch vụ 1",
    active: true,
  },
  {
    service_code: "KIO_01",
    service_name: "Kiosk",
    description: "Mô tả dịch vụ 1",
    active: true,
  },
];

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const Service = () => {
  //   useEffect(() => {
  //     onSnapshot(deviceCollection, (snapshot) => {
  //       let data = snapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       });
  //       dispatch(getDevices(data));
  //     });
  //   }, [dispatch]);

  const columns: ColumnsType<serviceProp> = [
    {
      title: "Mã dịch vụ",
      dataIndex: "service_code",
      key: "service_code",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "active",
      key: "active",
      render: (state) =>
        state ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle active"></div>
            <div>Hoạt động</div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle stop"></div>
            <div>Ngừng hoạt động</div>
          </div>
        ),
    },
    {
      title: "empty",
      dataIndex: "detail",
      key: "detail",
      render: (_, record) => (
        <Link to="/dichvu/chitietdichvu" state={{ record }}>
          Chi tiết
        </Link>
      ),
    },
    {
      title: "empty",
      dataIndex: "update",
      key: "update",
      render: (_, record) => (
        <Link to="/dichvu/capnhatdichvu" state={{ record }}>
          Cập nhật
        </Link>
      ),
    },
  ];
  const navigate = useNavigate();
  const [actionSelect, setActionSelect] = useState<string>("");
  const [search, setSearch] = useState("");
  const handleChangeAction = (value: string) => {
    setActionSelect(value);
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const handleAddService = () => {
    navigate("/dichvu/themdichvu");
  };

  return (
    <div style={{ display: "flex" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <h3>Danh sách thiết bị</h3>
        <div className="wrap-device">
          <div className="wrap-select">
            <div className="select">
              <label>Trạng thái hoạt động</label>
              <Select
                placeholder="Tất cả"
                style={{ width: "100%" }}
                onChange={handleChangeAction}
                value={actionSelect}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "true", label: "Hoạt động" },
                  { value: "false", label: "Ngừng hoạt động" },
                ]}
              />
            </div>
            <div className="select">
              <label>Chọn thời gian</label>
              <RangePicker
                defaultValue={[
                  dayjs("2015/01/01", dateFormat),
                  dayjs("2015/01/01", dateFormat),
                ]}
                format={dateFormat}
              />
            </div>
          </div>
          <div>
            <label>Từ khóa</label>
            <Search
              placeholder="Nhập từ khóa"
              allowClear
              onSearch={onSearch}
              style={{ width: "300px" }}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: "15px" }}
        />
      </Content>
      <div className="add-device">
        <div className="icon-add-device" onClick={handleAddService}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Thêm dịch vụ</div>
      </div>
    </div>
  );
};

export default Service;
