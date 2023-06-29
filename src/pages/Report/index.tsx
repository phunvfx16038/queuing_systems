import React from "react";
import { Layout, Input, Table, DatePicker } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import dayjs from "dayjs";
import { reportType } from "../../propTypes/reportType";
import "./report.css";

const { Content } = Layout;
const { Search } = Input;
const dataSource = [
  {
    stt: 2010001,
    service_name: "Khám tim mạch",
    date: "07:20 07/10/2021",
    status: "waiting",
    supply: "kiosk",
  },
  {
    stt: 2010002,
    service_name: "Khám hô hấp",
    date: "09:20 07/10/2021",
    status: "uesed",
    supply: "Hệ thống",
  },
  {
    stt: 2010003,
    service_name: "Khám sản - phụ khoa",
    date: "05:20 10/10/2021",
    status: "skip",
    supply: "kiosk",
  },
  {
    stt: 2010001,
    service_name: "Khám tim mạch",
    date: "07:20 07/10/2021",
    status: "waiting",
    supply: "kiosk",
  },
  {
    stt: 2010001,
    service_name: "Khám tim mạch",
    date: "07:20 07/10/2021",
    status: "waiting",
    supply: "kiosk",
  },
  {
    stt: 2010001,
    service_name: "Khám tim mạch",
    date: "07:20 07/10/2021",
    status: "waiting",
    supply: "kiosk",
  },
  {
    stt: 2010001,
    service_name: "Khám tim mạch",
    date: "07:20 07/10/2021",
    status: "waiting",
    supply: "kiosk",
  },
];

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const Report = () => {
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

  const columns: ColumnsType<reportType> = [
    {
      title: "Số thứ tự ",
      dataIndex: "stt",
      key: "stt",
      filters: [
        {
          text: "2001001",
          value: 2001001,
        },
        {
          text: "2001002",
          value: 2001002,
        },
        {
          text: "2001003",
          value: 2001003,
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      width: "30%",
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
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
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
  ];
  const navigate = useNavigate();

  const handleExportFile = () => {};

  const onChange: TableProps<reportType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <div className="wrap-device">
          <div className="wrap-select">
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
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: "15px" }}
          className="report"
        />
      </Content>
      <div className="add-device">
        <div className="icon-add-device" onClick={handleExportFile}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Tải về</div>
      </div>
    </div>
  );
};

export default Report;
