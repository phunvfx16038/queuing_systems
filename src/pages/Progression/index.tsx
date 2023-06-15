import React, { useEffect, useState } from "react";
import { Layout, Select, Input, Table, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { onSnapshot } from "firebase/firestore";
import { serviceProp } from "../../propTypes/serviceType";
import dayjs from "dayjs";
import { ProgressionType } from "../../propTypes/progressionType";
import "./progression.css";

const { Content } = Layout;
const { Search } = Input;
const dataSource = [
  {
    stt: 2011001,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "waiting",
    supply: "Kiosk",
  },
  {
    stt: 2011002,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "waiting",
    supply: "Kiosk",
  },
  {
    stt: 2011003,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "waiting",
    supply: "Kiosk",
  },
  {
    stt: 2011004,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "waiting",
    supply: "Kiosk",
  },
  {
    stt: 2011005,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "waiting",
    supply: "Kiosk",
  },
  {
    stt: 2011006,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "waiting",
    supply: "Kiosk",
  },
  {
    stt: 2011007,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "skip",
    supply: "Kiosk",
  },
  {
    stt: 2011008,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "used",
    supply: "Kiosk",
  },
  {
    stt: 2011009,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "skip",
    supply: "Kiosk",
  },
  {
    stt: 2011010,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "waiting",
    supply: "Kiosk",
  },
  {
    stt: 2011001,
    customer_name: "Lê Huỳnh Ái VÂn",
    service_name: "Khám tim mạch",
    date: "14:35 07/11/2021",
    expire_date: "14:35 12/11/2021",
    state: "used",
    supply: "Kiosk",
  },
];

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const Progression = () => {
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

  const columns: ColumnsType<ProgressionType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Thời gian cấp",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "expire_date",
      key: "expire_date",
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      render: (state) =>
        state === "waiting" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle working"></div>
            <div>Đang chờ</div>
          </div>
        ) : state === "used" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle absent"></div>
            <div>Đã sử dụng</div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle stop"></div>
            <div>Bỏ qua</div>
          </div>
        ),
    },
    {
      title: "Nguồn cấp",
      dataIndex: "supply",
      key: "supply",
    },
    {
      title: "empty",
      dataIndex: "detail",
      key: "detail",
      render: (_, record) => (
        <Link to="/capso/chitietcapso" state={{ record }}>
          Chi tiết
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
        <h3>Quản lý cấp số</h3>
        <div className="wrap-device">
          <div className="wrap-select">
            <div className="select" style={{ width: "180px" }}>
              <label>Tên dịch vụ </label>
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
            <div className="select" style={{ width: "180px" }}>
              <label>Tình trạng </label>
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
            <div className="select" style={{ width: "180px" }}>
              <label>Nguồn cấp </label>
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
            <div className="select" style={{ width: "180px" }}>
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
          <div style={{ width: "180px" }}>
            <label>Từ khóa</label>
            <Search
              placeholder="Nhập từ khóa"
              allowClear
              onSearch={onSearch}
              style={{ width: "100%" }}
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
        <div className="text-add-device">Cấp số mới</div>
      </div>
    </div>
  );
};

export default Progression;
