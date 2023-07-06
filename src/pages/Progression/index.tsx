import React, { useEffect, useState } from "react";
import {
  Layout,
  Select,
  Input,
  Table,
  DatePicker,
  DatePickerProps,
} from "antd";
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
import { RangePickerProps } from "antd/es/date-picker";
import Main from "../../Components/MainLayout";

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
  const [activeSelect, setActiveSelect] = useState<string>("");
  const [search, setSearch] = useState("");
  const [serviceNameSelect, setServiceNameSelect] = useState("");
  const [supplySelect, setSupplySelect] = useState("");

  const onSearch = (value: string) => {
    setSearch(value);
    const searchRoleData = progressionData.filter((progression) => {
      return progression.customer_name
        .toLowerCase()
        .includes(value.toLowerCase());
    });
    setProgressionLists(searchRoleData);
  };

  const handleChangeActive = (value: string) => {
    setActiveSelect(value);
    if (value === "all") {
      setProgressionLists(progressionData);
    } else {
      const filterData = progressionData.filter((progression) => {
        return progression.state.toLowerCase() === value.toLowerCase();
      });
      setProgressionLists(filterData);
    }
  };

  const handleChangeServiceName = (value: string) => {
    console.log(value);
    setServiceNameSelect(value);
    if (value === "all") {
      setProgressionLists(progressionData);
    } else {
      const filterData = progressionData.filter((progression) => {
        console.log(progression);
        return progression.supply.toLowerCase() === value.toLowerCase();
      });
      setProgressionLists(filterData);
    }
  };

  const handleChangeSupply = (value: string) => {
    setSupplySelect(value);
    if (value === "all") {
      setProgressionLists(progressionData);
    } else {
      const filterData = progressionData.filter((progression) => {
        return progression.service_name.toLowerCase() === value.toLowerCase();
      });
      setProgressionLists(filterData);
    }
  };

  const handleChangeDate = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    const startDateFormat = dayjs(dateString[0]).format("DD/MM/YYYY");
    const endDateFormat = dayjs(dateString[1]).format("DD/MM/YYYY");
    if (dateString[0] === "" && dateString[1] === "") {
      setProgressionLists(progressionData);
    } else {
      const filterData = progressionData.filter((progression) => {
        const dateFromData = progression.date.split(" ");
        const expireDateFromData = progression.expire_date.split(" ");
        return (
          dateFromData[1].includes(startDateFormat) ||
          expireDateFromData[1].includes(endDateFormat)
        );
      });
      setProgressionLists(filterData);
    }
  };

  const handleAddNumber = () => {
    navigate("/capso/themso");
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
          <h3>Quản lý cấp số</h3>
          <div className="wrap-device">
            <div className="wrap-select">
              <div className="select" style={{ width: "180px" }}>
                <label>Tên dịch vụ </label>
                <Select
                  placeholder="Tất cả"
                  style={{ width: "100%" }}
                  onChange={handleChangeServiceName}
                  value={serviceNameSelect}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "Khám phụ khoa", label: "Khám phụ khoa" },
                    { value: "Khám răng hàm mặt", label: "Khám răng hàm mặt" },
                    { value: "Khám tai mũi họng", label: "Khám tai mũi họng" },
                    { value: "Khám tổng quát", label: "Khám tổng quát" },
                    { value: "Khám hô hấp", label: "Khám hô hấp" },
                  ]}
                />
              </div>
              <div className="select" style={{ width: "180px" }}>
                <label>Tình trạng </label>
                <Select
                  placeholder="Tất cả"
                  style={{ width: "100%" }}
                  onChange={handleChangeActive}
                  value={activeSelect}
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
                  onChange={handleChangeSupply}
                  value={supplySelect}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "kiosk", label: "Kiosk" },
                    { value: "Hệ thống", label: "Hệ thống" },
                  ]}
                />
              </div>
              <div className="select" style={{ width: "180px" }}>
                <label>Chọn thời gian</label>
                <RangePicker format={dateFormat} onChange={handleChangeDate} />
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
        <div className="add-device" style={{ width: "90px", height: "90px" }}>
          <div className="icon-add-device" onClick={handleAddNumber}>
            <AiFillPlusSquare />
          </div>
          <div className="text-add-device">Cấp số mới</div>
        </div>
      </div>
    </Main>
  );
};

export default Progression;
