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

const Device = () => {
  const dispatch = useAppDispatch();
  const allDevices = useAppSelector((state) => state.devices.device);
  const [devicesData, setDevicesData] = useState<deviceProp[]>(allDevices);

  useEffect(() => {
    onSnapshot(deviceCollection, (snapshot) => {
      let data: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch(getDevices(data));
      setDevicesData(data);
    });
  }, [dispatch]);

  const navigate = useNavigate();
  const [activeSelect, setActiveSelect] = useState<string>("");
  const [connectSelect, setConnectSelect] = useState<string>("");
  const [search, setSearch] = useState("");

  const handleChangeActive = (value: string) => {
    setActiveSelect(value);
    if (value === "all") {
      setDevicesData(allDevices);
    } else {
      const filterData = allDevices.filter((device) => {
        return device.active === (value === "true");
      });
      setDevicesData(filterData);
    }
  };

  const handleChangeConnect = (value: string) => {
    setConnectSelect(value);
    if (value === "all") {
      setDevicesData(allDevices);
    } else {
      const filterData = allDevices.filter((device) => {
        return device.connect === (value === "true");
      });
      setDevicesData(filterData);
    }
  };

  const onSearch = (value: string) => {
    setSearch(value);
    const searchDeviceData = allDevices.filter((device) => {
      return (
        device.name.toLowerCase().includes(value.toLowerCase()) ||
        device.code.toLowerCase().includes(value.toLowerCase()) ||
        device.using_service
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    });
    setDevicesData(searchDeviceData);
  };

  const handleAddDevice = () => {
    navigate("/thietbi/themthietbi");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
                style={{ width: "100%" }}
                onChange={handleChangeActive}
                value={activeSelect}
                defaultValue={"all"}
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
                value={connectSelect}
                defaultValue={"all"}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "true", label: "Kết nối" },
                  { value: "false", label: "Ngắt kết nối" },
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
          dataSource={devicesData}
          style={{ marginTop: "15px" }}
          className="device-table"
        />
      </Content>
      <div className="add-device" style={{ width: "100px", height: "100px" }}>
        <div className="icon-add-device" onClick={handleAddDevice}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Thêm thiết bị</div>
      </div>
    </div>
  );
};

export default Device;
