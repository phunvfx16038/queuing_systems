import React, { useState, useEffect } from "react";
import { Layout, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { roleProp } from "../../propTypes/roleType";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getRoleManageCustom, roleManageCollection } from "../../app/roleSlice";
import { onSnapshot } from "firebase/firestore";
const { Content } = Layout;
const { Search } = Input;

const columns: ColumnsType<roleProp> = [
  {
    title: "Tên vai trò",
    dataIndex: "role_name",
    key: "role_name",
  },
  {
    title: "Số người dùng",
    dataIndex: "userNumber",
    key: "userNumber",
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
      <Link to="/caidathethong/quanlyvaitro/capnhatvaitro" state={{ record }}>
        Cập nhật
      </Link>
    ),
  },
];

const Managerole = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roleManageData = useAppSelector((state) => state.roleManage.roleManage);
  const userData = useAppSelector((state) => state.user.user);

  const [roleManage, setRoleManage] = useState<roleProp[]>(roleManageData);
  const [search, setSearch] = useState("");

  const customManageRoleData = () => {
    const data = roleManageData.reduce((stra: any, current) => {
      const fiterUserRole = userData.filter((user) => {
        return user.role.toLowerCase() === current.role_name.toLowerCase();
      });
      const newCount = {
        count: fiterUserRole.length,
        name: current.role_name,
      };
      return (stra = { ...newCount });
    }, {});
    return data;
  };

  customManageRoleData();

  useEffect(() => {
    onSnapshot(roleManageCollection, (snapshot) => {
      let data: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const mangegeroleCustom = data.map((item: any) => {
        // Object.values(
        const custom = userData.reduce((a, user) => {
          a = { ...item, userNumber: 0 };
          a.userNumber = a.userNumber + 1;
          return a;
        }, Object.create(null));
        // );
        return custom;
      });
      dispatch(getRoleManageCustom(mangegeroleCustom));
      setRoleManage(mangegeroleCustom);
    });
  }, [dispatch]);

  const onSearch = (value: string) => {
    setSearch(value);
    const searchRoleData = roleManageData.filter((role) => {
      return (
        role.description.toLowerCase().includes(value.toLowerCase()) ||
        role.role_name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setRoleManage(searchRoleData);
  };

  const handleAddRole = () => {
    navigate("/caidathethong/quanlyvaitro/themvaitro");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
          dataSource={roleManage}
          style={{ marginTop: "15px" }}
          className="service-table"
        />
      </Content>
      <div className="add-device" style={{ width: "90px", height: "90px" }}>
        <div className="icon-add-device" onClick={handleAddRole}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Thêm vai trò</div>
      </div>
    </div>
  );
};

export default Managerole;
