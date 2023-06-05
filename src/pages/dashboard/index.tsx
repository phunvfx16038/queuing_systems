import React, { useEffect, useState } from "react";
import { Col, Layout, Progress, Row, Select } from "antd";
import CardLevel from "../../Components/CardLevel";
import "./dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  BiCalendarAlt,
  BiCalendarCheck,
  BiUserVoice,
  BiDownArrowAlt,
  BiUpArrowAlt,
} from "react-icons/bi";
import { CiBookmarkRemove } from "react-icons/ci";
import {
  CiGrid42,
  CiMonitor,
  CiSettings,
  CiReceipt,
  CiLogout,
} from "react-icons/ci";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export const data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: [
        1200, 2120, 3320, 4242, 1500, 2700, 3843, 4999, 2080, 4502, 2721, 1539,
      ],
      borderColor: "#5185F7",
      backgroundColor: "#CEDDFF",
      tension: 0.4,
    },
  ],
};

const { Content } = Layout;

const cardData = [
  {
    icon1: <BiCalendarAlt />,
    title: "Số thứ tự đã cấp",
    value: 4221,
    icon2: <BiUpArrowAlt />,
    percent: 32.41,
    type: "ble",
  },
  {
    icon1: <BiCalendarCheck />,
    title: "Số thứ tự đã sử dụng",
    value: 3721,
    icon2: <BiDownArrowAlt />,
    percent: 12.3,
    type: "green",
  },
  {
    icon1: <BiUserVoice />,
    title: "Số thứ tự đang chờ",
    value: 468,
    icon2: <BiUpArrowAlt />,
    percent: 32.41,
    type: "orange",
  },
  {
    icon1: <CiBookmarkRemove />,
    title: "Số thứ tự đã bỏ qua",
    value: 32,
    icon2: <BiDownArrowAlt />,
    percent: 32.41,
    type: "red",
  },
];

const DashBoard = () => {
  const [selected, setSelected] = useState<string>("tháng");
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: [
          1200, 2120, 3320, 4242, 1500, 2700, 3843, 4999, 2080, 4502, 2721,
          1539,
        ],
        borderColor: "#5185F7",
        backgroundColor: "#CEDDFF",
        tension: 0.4,
      },
    ],
  });
  const [chartOption, setChartOption] = useState<ChartOptions>({
    responsive: true,
    plugins: {
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart",
      // },
    },
  });

  useEffect(() => {
    if (selected === "ngày") {
      setChartData({
        labels: ["1", "12", "23", "31"],
        datasets: [
          {
            fill: true,
            label: "Dataset 2",
            data: [1200, 2120, 3320, 4242],
            borderColor: "#5185F7",
            backgroundColor: "#CEDDFF",
            tension: 0.4,
          },
        ],
      });
    }
    if (selected === "tuần") {
      setChartData({
        labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
        datasets: [
          {
            fill: true,
            label: "Dataset 2",
            data: [3200, 5120, 2320, 1242],
            borderColor: "#5185F7",
            backgroundColor: "#CEDDFF",
            tension: 0.4,
          },
        ],
      });
    }
    if (selected === "tháng") {
      setChartData({
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            fill: true,
            label: "Dataset 2",
            data: [
              1200, 2120, 3320, 4242, 1500, 2700, 3843, 4999, 2080, 4502, 2721,
              1539,
            ],
            borderColor: "#5185F7",
            backgroundColor: "#CEDDFF",
            tension: 0.2,
          },
        ],
      });
    }
  }, [selected]);

  const handleChange = (value: string) => {
    setSelected(value);
  };
  return (
    <div style={{ display: "flex" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
          width: "66.66%",
        }}
      >
        <h3>Biểu đồ cấp số</h3>
        <Row gutter={[16, 16]}>
          {cardData.map((card, index) => (
            <Col span={6} key={index}>
              <CardLevel
                icon1={card.icon1}
                icon2={card.icon2}
                percent={card.percent}
                title={card.title}
                value={card.value}
                type={card.type}
              />
            </Col>
          ))}
        </Row>
        <div className="wrap-chart">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <h4>Bảng thống kê theo {selected}</h4>
            <div>
              <span style={{ marginRight: "15px" }}>Xem theo</span>
              <Select
                defaultValue="Tháng"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: "ngày", label: "Ngày" },
                  { value: "tuần", label: "Tuần" },
                  { value: "tháng", label: "Tháng" },
                ]}
              />
            </div>
          </div>
          <Line options={chartOption} data={chartData} />
        </div>
      </Content>
      <div
        style={{
          width: "33.33%",
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <div className="overview-card">
          <div className="over-view-progress">
            <Progress
              type="circle"
              percent={90}
              strokeColor={{ "100%": "#FF7506" }}
              size={60}
            />
            <div className="overview-value">
              <p>4221</p>
              <span className="overview-icon">
                <CiMonitor style={{ marginRight: "10px" }} />
                Thiết bị
              </span>
            </div>
          </div>
          <div className="overview-status">
            <p>
              Đang hoạt động: <span style={{ fontWeight: "700" }}>3799</span>
            </p>
            <p>
              Ngưng hoạt động: <span style={{ fontWeight: "700" }}>422</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
