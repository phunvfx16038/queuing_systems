import React, { useEffect, useState } from "react";
import { Layout, Input, Table, DatePicker, DatePickerProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import { diaryType } from "../../propTypes/diaryType";
import { RangePickerProps } from "antd/es/date-picker";
import { onSnapshot } from "firebase/firestore";
import { diaryCollection, getDiarys } from "../../app/diarySlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

const { Content } = Layout;
const { Search } = Input;

export type userDiaryType = {
  userName: string;
  date?: string;
  ipAddress?: string;
  action: string;
};
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const UserDiary = () => {
  const diaryLists = useAppSelector((state) => state.diary.diary);
  const [diaryData, setDiaryData] = useState<userDiaryType[]>(diaryLists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onSnapshot(diaryCollection, (snapshot) => {
      let data: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch(getDiarys(data));
      setDiaryData(data);
    });
  }, [dispatch]);

  const columns: ColumnsType<userDiaryType> = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Thời gian tác động",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "IP thực hiện",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "action",
      key: "action",
    },
  ];

  const handleChangeDate = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    const startDateFormat = dayjs(dateString[0]).format("DD/MM/YYYY");
    const endDateFormat = dayjs(dateString[1]).format("DD/MM/YYYY");
    if (dateString[0] === "" && dateString[1] === "") {
      setDiaryData(diaryLists);
    } else {
      const filterData = diaryLists.filter((progression) => {
        if (progression.date) {
          const dateFromData = progression.date.split(" ");
          return (
            dateFromData[1].includes(startDateFormat) ||
            dateFromData[1].includes(endDateFormat)
          );
        }
      });
      setDiaryData(filterData);
    }
  };

  const onSearch = (value: string) => {
    const searchDiaryData = diaryLists.filter((diary) => {
      return (
        diary.action.toLowerCase().includes(value.toLowerCase()) ||
        diary.ipAddress?.toLowerCase().includes(value.toLowerCase()) ||
        diary.userName.includes(value.toLowerCase())
      );
    });
    setDiaryData(searchDiaryData);
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
              <RangePicker onChange={handleChangeDate} format={dateFormat} />
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
          dataSource={diaryData}
          style={{ marginTop: "15px" }}
          className="report"
        />
      </Content>
    </div>
  );
};

export default UserDiary;
