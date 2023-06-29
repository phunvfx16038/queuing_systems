import React, { useState, useEffect } from "react";
import { Layout, Select, Input, Table, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { serviceProp } from "../../propTypes/serviceType";
import { Dayjs } from "dayjs";
import "./service.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { onSnapshot } from "firebase/firestore";
import { getServices, serviceCollection } from "../../app/serviceSlice";
const { Content } = Layout;
const { Search } = Input;

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const columns: ColumnsType<serviceProp> = [
  {
    title: "Mã dịch vụ",
    dataIndex: "service_code",
    key: "service_code",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "service_name",
    key: "service_name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
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
    dataIndex: "detail",
    key: "detail",
    render: (_, record) => (
      <Link to="/dichvu/chitietdichvu" state={{ record }}>
        Chi tiết
      </Link>
    ),
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

const Service = () => {
  const navigate = useNavigate();
  const services = useAppSelector((state) => state.service.service);
  const [servicesData, setServicesData] = useState(services);
  const [activeSelect, setActiveSelect] = useState<string>("");
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    onSnapshot(serviceCollection, (snapshot) => {
      let data: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch(getServices(data));
      setServicesData(data);
    });
  }, [dispatch]);

  const handleChangeActive = (value: string) => {
    setActiveSelect(value);
    if (value === "all") {
      setServicesData(services);
    } else {
      const filterData = services.filter((service) => {
        return service.active === (value === "true");
      });
      setServicesData(filterData);
    }
  };

  const onSearch = (value: string) => {
    setSearch(value);
    const searchDeviceData = services.filter((service) => {
      return (
        service.service_code.toLowerCase().includes(value.toLowerCase()) ||
        service.service_name.toLowerCase().includes(value.toLowerCase()) ||
        service.description.toLowerCase().includes(value.toLowerCase())
      );
    });
    setServicesData(searchDeviceData);
  };

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const handleAddService = () => {
    navigate("/dichvu/themdichvu");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Content
        style={{
          margin: "24px 16px 0",
          backgroundColor: "#EAEAEC",
        }}
      >
        <h3>Danh sách dịch vụ</h3>
        <div className="wrap-device">
          <div className="wrap-select">
            <div className="select">
              <label>Trạng thái hoạt động</label>
              <Select
                placeholder="Tất cả"
                style={{ width: "100%" }}
                onChange={handleChangeActive}
                value={activeSelect}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "true", label: "Hoạt động" },
                  { value: "false", label: "Ngừng hoạt động" },
                ]}
              />
            </div>
            <div className="select">
              <label>Chọn thời gian</label>
              <RangePicker format={dateFormat} onChange={onRangeChange} />
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
          dataSource={servicesData}
          style={{ marginTop: "15px" }}
          className="service-table"
        />
      </Content>
      <div className="add-device">
        <div className="icon-add-device" onClick={handleAddService}>
          <AiFillPlusSquare />
        </div>
        <div className="text-add-device">Thêm dịch vụ</div>
      </div>
    </div>
  );
};

export default Service;
