import React, { useEffect, useState } from "react";
import { Layout, Select, Input, Table, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { onSnapshot } from "firebase/firestore";
import { serviceProp } from "../../propTypes/serviceType";
import dayjs from "dayjs";
import { ProgressionType } from "../../propTypes/progressionType";
import "./progression.css";
import {
  getProgressions,
  progressionCollection,
} from "../../app/progressionSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

const { Content } = Layout;
const { Search } = Input;

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const columns: ColumnsType<ProgressionType> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "service_name",
    key: "service_name",
  },
  {
    title: "Thời gian cấp",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Hạn sử dụng",
    dataIndex: "expire_date",
    key: "expire_date",
  },
  {
    title: "Trạng thái",
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
    dataIndex: "supply",
    key: "supply",
  },
  {
    title: "empty",
    dataIndex: "detail",
    key: "detail",
    render: (_, record) => (
      <Link to="/capso/chitietcapso" state={{ record }}>
        Chi tiết
      </Link>
    ),
  },
];
const Progression = () => {
  const dispatch = useAppDispatch();
  const progressionData = useAppSelector(
    (state) => state.progression.progression
  );
  const [progressionLists, setProgressionLists] = useState(progressionData);
  useEffect(() => {
    onSnapshot(progressionCollection, (snapshot) => {
      let data: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch(getProgressions(data));
      setProgressionLists(data);
    });
  }, [dispatch]);

  const navigate = useNavigate();
  const [actionSelect, setActionSelect] = useState<string>("");
  const [search, setSearch] = useState("");
  const handleChangeAction = (value: string) => {
    setActionSelect(value);
  };

  const onSearch = (value: string) => {
    // setSearch(value);
    // const searchRoleData = roleManageData.filter((role) => {
    //   return (
    //     role.description.toLowerCase().includes(value.toLowerCase()) ||
    //     role.role_name.toLowerCase().includes(value.toLowerCase())
    //   );
    // });
    // setRoleManage(searchRoleData);
  };

  const handleChangeActive = (value: string) => {
    // setActiveSelect(value);
    // if (value === "all") {
    //   setDevicesData(allDevices);
    // } else {
    //   const filterData = allDevices.filter((device) => {
    //     return device.active === (value === "true");
    //   });
    //   setDevicesData(filterData);
    // }
  };

  const handleChangeConnect = (value: string) => {
    // setConnectSelect(value);
    // if (value === "all") {
    //   setDevicesData(allDevices);
    // } else {
    //   const filterData = allDevices.filter((device) => {
    //     return device.connect === (value === "true");
    //   });
    //   setDevicesData(filterData);
    // }
  };

  const handleAddNumber = () => {
    navigate("/capso/themso");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <h3>Quản lý cấp số</h3>
        <div className="wrap-device">
          <div className="wrap-select">
            <div className="select" style={{ width: "180px" }}>
              <label>Tên dịch vụ </label>
              <Select
                placeholder="Tất cả"
                style={{ width: "100%" }}
                onChange={handleChangeAction}
                value={actionSelect}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "gynecological", label: "Khám sản phụ khoa" },
                  { value: "teeth", label: "Khám răng hàm mặt" },
                  { value: "otolaryngology", label: "Khám tai mũi họng" },
                  { value: "general", label: "Khám tổng quát" },
                  { value: "respiratory", label: "Khám hô hấp" },
                ]}
              />
            </div>
            <div className="select" style={{ width: "180px" }}>
              <label>Tình trạng </label>
              <Select
                placeholder="Tất cả"
                style={{ width: "100%" }}
                onChange={handleChangeAction}
                value={actionSelect}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "waiting", label: "Đang chờ" },
                  { value: "used", label: "Đã sử dụng" },
                  { value: "skip", label: "Bỏ qua" },
                ]}
              />
            </div>
            <div className="select" style={{ width: "180px" }}>
              <label>Nguồn cấp </label>
              <Select
                placeholder="Tất cả"
                style={{ width: "100%" }}
                onChange={handleChangeAction}
                value={actionSelect}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "kiosk", label: "Kiosk" },
                  { value: "system", label: "Hệ thống" },
                ]}
              />
            </div>
            <div className="select" style={{ width: "180px" }}>
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
          <div style={{ width: "180px" }}>
            <label>Từ khóa</label>
            <Search
              placeholder="Nhập từ khóa"
              allowClear
              onSearch={onSearch}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={progressionLists}
          style={{ marginTop: "15px" }}
        />
      </Content>
      <div className="add-device">
        <div className="icon-add-device" onClick={handleAddNumber}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Cấp số mới</div>
      </div>
    </div>
  );
};

export default Progression;
