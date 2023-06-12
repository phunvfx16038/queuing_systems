import React, { useEffect, useState } from "react";
import { Layout, Select, Input, Table } from "antd";
import "./device.css";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { deviceCollection, getDevices } from "../../app/deviceSlice";
import { onSnapshot } from "firebase/firestore";
import { deviceProp } from "../../propTypes/deviceType";

const { Content } = Layout;
const { Search } = Input;

const Device = () => {
  const dispatch = useAppDispatch();
  const allDevices = useAppSelector((state) => state.devices.device);
  useEffect(() => {
    onSnapshot(deviceCollection, (snapshot) => {
      let data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch(getDevices(data));
    });
  }, [dispatch]);

  const columns: ColumnsType<deviceProp> = [
    {
      title: "Mã thiết bị",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ip_address",
      key: "ip_address",
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
      title: "Trạng thái kết nối",
      dataIndex: "connect",
      key: "connect",
      render: (state) =>
        state ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle active"></div>
            <div>Kết nối</div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="circle stop"></div>
            <div>Ngắt Kết nối</div>
          </div>
        ),
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "using_service",
      key: "using_service",
      render: (data) => (
        <>
          <div>{data.toString()}</div>
        </>
      ),
    },
    {
      title: "empty",
      dataIndex: "detail",
      key: "detail",
      render: (_, record) => (
        <Link to="/thietbi/chitietthietbi" state={{ record }}>
          Chi tiết
        </Link>
      ),
    },
    {
      title: "empty",
      dataIndex: "update",
      key: "update",
      render: (_, record) => (
        <Link to="/thietbi/capnhatthietbi" state={{ record }}>
          Cập nhật
        </Link>
      ),
    },
  ];
  const navigate = useNavigate();
  const [actionSelect, setActionSelect] = useState<string>("");
  const [connectSelect, setConnectSelect] = useState<string>("");
  const [search, setSearch] = useState("");
  const handleChangeAction = (value: string) => {
    setActionSelect(value);
  };

  const handleChangeConnect = (value: string) => {
    setConnectSelect(value);
    console.log(datafilterConnect);
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const handleAddDevice = () => {
    navigate("/thietbi/themthietbi");
  };

  const datafilterConnect = allDevices.filter(
    (device) => device.connect === Boolean(connectSelect)
  );

  return (
    <div style={{ display: "flex" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <h3>Danh sách thiết bị</h3>
        <div className="wrap-device">
          <div className="wrap-select">
            <div className="select">
              <label>Trạng thái hoạt động</label>
              <Select
                placeholder="Tất cả"
                style={{ width: "100%" }}
                onChange={handleChangeAction}
                value={actionSelect}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "true", label: "Hoạt động" },
                  { value: "false", label: "Ngừng hoạt động" },
                ]}
              />
            </div>
            <div className="select">
              <label>Trạng thái kết nối</label>
              <Select
                style={{ width: "100%" }}
                onChange={handleChangeConnect}
                placeholder="Tất cả"
                value={connectSelect}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "true", label: "Kết nối" },
                  { value: "false", label: "Mất kết nối" },
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
          dataSource={allDevices}
          style={{ marginTop: "15px" }}
        />
      </Content>
      <div className="add-device">
        <div className="icon-add-device" onClick={handleAddDevice}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Thêm thiết bị</div>
      </div>
    </div>
  );
};

export default Device;
