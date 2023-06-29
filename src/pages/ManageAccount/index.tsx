import React, { useState, useEffect } from "react";
import { Layout, Input, Table, DatePicker, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import "./manageAccount.css";
import { userType } from "../../dataTypes/userType";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { onSnapshot } from "firebase/firestore";
import { getUsers, userCollection } from "../../app/userSlice";

const { Content } = Layout;
const { Search } = Input;

const columns: ColumnsType<userType> = [
  {
    title: "Tên đăng nhập",
    dataIndex: "user_name",
    key: "user_name",
  },
  {
    title: "Họ tên",
    dataIndex: "displayName",
    key: "displayName",
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
    render: (state) =>
      state === "admin" ? (
        <div>Admin</div>
      ) : state === "manager" ? (
        <div>Quản lý</div>
      ) : (
        <div>Kế toán</div>
      ),
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
const ManageAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const manageAccountData = useAppSelector((state) => state.user.user);
  const [manageAccounts, setManageAccounts] = useState(manageAccountData);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    onSnapshot(userCollection, (snapshot) => {
      let data: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch(getUsers(data));
      setManageAccounts(data);
    });
  }, [dispatch]);

  const handleSelectActive = (value: string) => {
    setActive(value);
    if (value === "all") {
      setManageAccounts(manageAccountData);
    } else {
      const filterData = manageAccountData.filter((manageaccount) => {
        return manageaccount.active === (value === "true");
      });
      setManageAccounts(filterData);
    }
  };

  const onSearch = (value: string) => {
    setSearch(value);
    const searchUserData = manageAccountData.filter((manageaccount) => {
      return (
        manageaccount.displayName.toLowerCase().includes(value.toLowerCase()) ||
        manageaccount.email.toLowerCase().includes(value.toLowerCase()) ||
        manageaccount.phone.toLowerCase().includes(value.toLowerCase()) ||
        manageaccount.role.toLowerCase().includes(value.toLowerCase()) ||
        manageaccount.user_name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setManageAccounts(searchUserData);
  };

  const handleAddRole = () => {
    navigate("/quanlytaikhoan/themtaikhoan");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
                onChange={handleSelectActive}
                value={active}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "true", label: "Hoạt động" },
                  { value: "false", label: "Ngừng hoạt động" },
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
          dataSource={manageAccounts}
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
