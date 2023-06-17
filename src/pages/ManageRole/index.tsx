import React, { useState } from "react";
import { Layout, Input, Table, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { roleProp } from "../../propTypes/roleType";
const { Content } = Layout;
const { Search } = Input;
const dataSource = [
  {
    role_name: "Kế toán",
    user_number: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    role_name: "Bác sĩ",
    user_number: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    role_name: "Admin",
    user_number: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    role_name: "Kế toán",
    user_number: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    role_name: "Lễ Tân",
    user_number: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
  {
    role_name: "SuperAdmin",
    user_number: 6,
    description: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
  },
];

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const Managerole = () => {
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

  const columns: ColumnsType<roleProp> = [
    {
      title: "Tên vai trò",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "Số người dùng",
      dataIndex: "user_number",
      key: "user_number",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const handleAddRole = () => {
    navigate("/themvaitro");
  };

  return (
    <div style={{ display: "flex" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <h3>Danh sách vai trò</h3>
        <div className="wrap-device" style={{ justifyContent: "end" }}>
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
          className="service-table"
        />
      </Content>
      <div className="add-device">
        <div className="icon-add-device" onClick={handleAddRole}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Thêm vai trò</div>
      </div>
    </div>
  );
};

export default Managerole;
