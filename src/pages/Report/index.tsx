import React, { useEffect, useState } from "react";
import { Layout, Input, Table, DatePicker } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import dayjs from "dayjs";
import { reportType } from "../../propTypes/reportType";
import "./report.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { onSnapshot } from "firebase/firestore";
import {
  getProgressions,
  progressionCollection,
} from "../../app/progressionSlice";
import { ProgressionType } from "../../propTypes/progressionType";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import Main from "../../Components/MainLayout";

const { Content } = Layout;
const { Search } = Input;

const columns: ColumnsType<ProgressionType> = [
  {
    title: "Số thứ tự ",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "supply",
    key: "supply",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Tình trạng",
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
    dataIndex: "service_name",
    key: "service_name",
  },
];
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const Report = () => {
  const dispatch = useAppDispatch();
  const progressionData = useAppSelector(
    (state) => state.progression.progression
  );
  const [reportLists, setReportLists] = useState(progressionData);
  useEffect(() => {
    onSnapshot(progressionCollection, (snapshot) => {
      let data: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch(getProgressions(data));
      setReportLists(data);
    });
  }, [dispatch]);

  const handleChangeDate = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    const startDateFormat = dayjs(dateString[0]).format("DD/MM/YYYY");
    const endDateFormat = dayjs(dateString[1]).format("DD/MM/YYYY");
    if (dateString[0] === "" && dateString[1] === "") {
      setReportLists(progressionData);
    } else {
      const filterData = progressionData.filter((progression) => {
        const dateFromData = progression.date.split(" ");
        const expireDateFromData = progression.expire_date.split(" ");
        return (
          dateFromData[1].includes(startDateFormat) ||
          expireDateFromData[1].includes(endDateFormat)
        );
      });
      setReportLists(filterData);
    }
  };

  const handleExportFile = () => {};

  return (
    <Main>
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
                <RangePicker format={dateFormat} onChange={handleChangeDate} />
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={reportLists}
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
    </Main>
  );
};

export default Report;
