import React, { useState } from "react";
import { Layout, Input, Table, DatePicker, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { managerAccountProp } from "../../propTypes/manageAccountTypes";
import "./manageAccount.css";

const { Content } = Layout;
const { Search } = Input;
const dataSource = [
  {
    user_name: "tuyennguyen@12",
    name: "Nguyen Van A",
    phone: 20876543211,
    email: "tuyennguyen12@gmail.com",
    role: "Kế toán",
    active: true,
  },
  {
    user_name: "tuyennguyen@16",
    name: "Nguyen Van B",
    phone: 20876543211,
    email: "tuyennguyen16@gmail.com",
    role: "Kế toán",
    active: false,
  },
  {
    user_name: "tuyennguyen@122",
    name: "Nguyen Van D",
    phone: 20876543211,
    email: "tuyennguyen122@gmail.com",
    role: "Quản lý",
    active: true,
  },
  {
    user_name: "tuyennguyen@142",
    name: "Nguyen Van E",
    phone: 20876543211,
    email: "tuyennguyen142@gmail.com",
    role: "Admin",
    active: true,
  },
  {
    user_name: "tuyennguyen@12",
    name: "Nguyen Van A",
    phone: 20876543211,
    email: "tuyennguyen12@gmail.com",
    role: "Kế toán",
    active: false,
  },
  {
    user_name: "tuyennguyen@12",
    name: "Nguyen Van A",
    phone: 20876543211,
    email: "tuyennguyen12@gmail.com",
    role: "Kế toán",
    active: true,
  },
];

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const ManageAccount = () => {
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

  const columns: ColumnsType<managerAccountProp> = [
    {
      title: "Tên đăng nhập",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
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
      dataIndex: "update",
      key: "update",
      render: (_, record) => (
        <Link to="/quanlytaikhoan/capnhattaikhoan" state={{ record }}>
          Cập nhật
        </Link>
      ),
    },
  ];
  const navigate = useNavigate();
  const [actionSelect, setActionSelect] = useState<string>("");
  const [search, setSearch] = useState("");
  const [roleSelect, setRoleSelect] = useState("");

  const handleSelectRole = (value: string) => {
    setRoleSelect(value);
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const handleAddRole = () => {
    navigate("/quanlytaikhoan/themtaikhoan");
  };

  return (
    <div style={{ display: "flex" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <h3>Danh sách tài khoản</h3>
        <div className="wrap-device">
          <div className="wrap-select">
            <div className="select">
              <label>Trạng thái hoạt động</label>
              <Select
                placeholder="Tất cả"
                style={{ width: "100%" }}
                onChange={handleSelectRole}
                value={roleSelect}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "accountant", label: "Kế toán" },
                  { value: "manager", label: "Quản lý" },
                  { value: "admin", label: "Admin" },
                ]}
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
          className="account-table"
        />
      </Content>
      <div className="add-device">
        <div className="icon-add-device" onClick={handleAddRole}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Thêm tài khoản</div>
      </div>
    </div>
  );
};

export default ManageAccount;
