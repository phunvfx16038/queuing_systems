import React from "react";
import { Layout, Input, Table, DatePicker, DatePickerProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import { diaryType } from "../../propTypes/diaryType";
import { RangePickerProps } from "antd/es/date-picker";
import Main from "../../Components/MainLayout";

const { Content } = Layout;
const { Search } = Input;

type userDiaryType = {
  user_name: string;
  date: string;
  ip_address: string;
  action: string;
};

const dataSource = [
  {
    user_name: "tuyetnguyen@12",
    date: "07:20 07/10/2021",
    ip_address: "192.168.0.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    user_name: "tuyetnguyen@12",
    date: "07:20 07/10/2021",
    ip_address: "192.168.0.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    user_name: "tuyetnguyen@12",
    date: "07:20 07/10/2021",
    ip_address: "192.168.0.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    user_name: "tuyetnguyen@12",
    date: "07:20 07/10/2021",
    ip_address: "192.168.0.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    user_name: "tuyetnguyen@12",
    date: "07:20 07/10/2021",
    ip_address: "192.168.0.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    user_name: "tuyetnguyen@12",
    date: "07:20 07/10/2021",
    ip_address: "192.168.0.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  },
  {
    user_name: "tuyetnguyen@12",
    date: "07:20 07/10/2021",
    ip_address: "192.168.0.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  },
];

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const UserDiary = () => {
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

  const columns: ColumnsType<diaryType> = [
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
    // const startDateFormat = dayjs(dateString[0]).format("DD/MM/YYYY");
    // const endDateFormat = dayjs(dateString[1]).format("DD/MM/YYYY");
    // if (dateString[0] === "" && dateString[1] === "") {
    //   setReportLists(progressionData);
    // } else {
    //   const filterData = progressionData.filter((progression) => {
    //     const dateFromData = progression.date.split(" ");
    //     const expireDateFromData = progression.expire_date.split(" ");
    //     return (
    //       dateFromData[1].includes(startDateFormat) ||
    //       expireDateFromData[1].includes(endDateFormat)
    //     );
    //   });
    //   setReportLists(filterData);
    // }
  };

  const onSearch = (value: string) => {
    // setSearch(value);
  };
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
            // columns={columns}
            // dataSource={dataSource}
            style={{ marginTop: "15px" }}
            className="report"
          />
        </Content>
      </div>
    </Main>
  );
};

export default UserDiary;
