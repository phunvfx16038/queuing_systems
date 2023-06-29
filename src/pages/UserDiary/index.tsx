import React from "react";
import { Layout, Input, Table, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

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

  const columns: ColumnsType<userDiaryType> = [
    {
      title: "Tên đăng nhập",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Thời gian tác động",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "IP thực hiện",
      dataIndex: "ip_address",
      key: "ip_address",
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "action",
      key: "action",
    },
  ];
  const navigate = useNavigate();
  const onSearch = (value: string) => {
    // setSearch(value);
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
          className="report"
        />
      </Content>
      <div className="add-device"></div>
    </div>
  );
};

export default UserDiary;
