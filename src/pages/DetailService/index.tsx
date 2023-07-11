import React, { useEffect, useState } from "react";
import { DatePicker, Input, Layout, Select, Table } from "antd";
import { FaPen } from "react-icons/fa";
import { BsArrowReturnLeft } from "react-icons/bs";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";

const { Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;
type tableProp = {
  stt: number;
  state: string;
};
const dateFormat = "YYYY/MM/DD";

const columns: ColumnsType<tableProp> = [
  {
    title: "Số thứ tự",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
    render: (state) =>
      state === "used" ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="circle active"></div>
          <div>Đã hoàn thành</div>
        </div>
      ) : state === "waiting" ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="circle working"></div>
          <div>Đã thực hiện</div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="circle absent"></div>
          <div>Vắng</div>
        </div>
      ),
  },
];

const DetailService = () => {
  const location = useLocation();
  const serviceDetail = location.state.record;
  const progression = useAppSelector((state) => state.progression.progression);
  const [initdetailTableData, setInitDetailTableData] = useState<tableProp[]>(
    []
  );
  const [detailTableData, setDetailTableData] = useState<tableProp[]>([]);
  const [activeSelect, setActiveSelect] = useState<string>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const detailData: any = progression.filter((detail) => {
      return (
        detail.supply.toLowerCase() === serviceDetail.description.toLowerCase()
      );
    });
    setDetailTableData(detailData);
    setInitDetailTableData(detailData);
  }, [progression]);

  const onSearch = (value: string) => {
    setSearch(value);
    const searchRoleData = initdetailTableData.filter((progression) => {
      return progression.stt.toString() === value;
    });
    setDetailTableData(searchRoleData);
  };

  const handleChangeActive = (value: string) => {
    setActiveSelect(value);
    if (value === "all") {
      setDetailTableData(initdetailTableData);
    } else {
      const filterData: any = initdetailTableData.filter((item) => {
        return item.state.toLowerCase() === value.toLowerCase();
      });
      setDetailTableData(filterData);
    }
  };
  const navigate = useNavigate();
  const navigateToAddService = () => {
    navigate("/dichvu/themdichvu");
  };

  const backToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <Content
      style={{
        margin: "24px 0 24px 15px",
        backgroundColor: "#EAEAEC",
      }}
    >
      <h3>Quản lý dịch vụ</h3>
      {/* Service Information */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px 20px 50px 20px",
            borderRadius: "5px",
            color: "#535261",
            height: "95vh",
            width: "30%",
            marginRight: "15px",
            boxSizing: "unset",
          }}
        >
          <h3>Thông tin dịch vụ</h3>
          <div className="wrap-detail">
            <label>Mã dịch vụ:</label>
            <span>{serviceDetail.service_code}</span>
          </div>
          <div className="wrap-detail">
            <label>Tên dịch vụ:</label>
            <span>{serviceDetail.service_name}</span>
          </div>
          <div className="wrap-detail">
            <label>Mô tả:</label>
            <span>{serviceDetail.description}</span>
          </div>
          <h3>Quy tắc cấp số</h3>
          <div className="wrap-detail">
            <label>Tăng tự động:</label>
            <span
              style={{
                padding: "5px",
                marginRight: "10px",
                border: "1px solid #D4D4D7",
                borderRadius: "5px",
              }}
            >
              {serviceDetail.countAuto ? serviceDetail.autoCountValue1 : 0}
            </span>
            <span>đến</span>
            <span
              style={{
                marginLeft: "10px",
                border: "1px solid #D4D4D7",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              {serviceDetail.countAuto ? serviceDetail.autoCountValue2 : 0}
            </span>
          </div>
          <div className="wrap-detail" style={{ marginTop: "10px" }}>
            <label>Prefix:</label>
            <span
              style={{
                padding: "5px",
                border: "1px solid #D4D4D7",
                borderRadius: "5px",
                marginLeft: "50px",
              }}
            >
              {serviceDetail.prefix ? serviceDetail.prefixValue : 0}
            </span>
          </div>
          <div className="wrap-detail">
            <label>Reset mỗi ngày</label>
          </div>
          <div>Ví dụ: 201-2001</div>
        </div>
        {/* Table Service */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px 20px 50px 20px",
            borderRadius: "5px",
            color: "#535261",
            height: "95vh",
            width: "55%",
            marginRight: "15px",
          }}
        >
          <div className="wrap-device">
            <div className="wrap-select">
              <div className="select" style={{ width: "180px" }}>
                <label>Trạng thái</label>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Tất cả"
                  value={activeSelect}
                  onChange={handleChangeActive}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "used", label: "Đã hoàn thành" },
                    { value: "waiting", label: "Đã thực hiện" },
                    { value: "skip", label: "Vắng" },
                  ]}
                />
              </div>
              <div className="select" style={{ width: "180px" }}>
                <label>Chọn thời gian</label>
                <RangePicker
                  style={{ width: "100%" }}
                  defaultValue={[
                    dayjs("2015/01/01", dateFormat),
                    dayjs("2015/01/01", dateFormat),
                  ]}
                  format={dateFormat}
                />
              </div>
            </div>
            <div style={{ width: "33%" }}>
              <label>Từ khóa</label>
              <Search
                placeholder="Nhập từ khóa"
                allowClear
                onSearch={onSearch}
                style={{ width: "200px" }}
              />
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={detailTableData}
            style={{ marginTop: "15px" }}
          />
        </div>
        <div style={{ width: "7%", marginLeft: "20px" }}>
          <div
            className="add-device"
            style={{ width: "80px", height: "90px", marginTop: 0 }}
          >
            <div className="icon-add-device" onClick={navigateToAddService}>
              <FaPen />
            </div>
            <div className="text-add-device">Thêm dịch vụ</div>
          </div>
          <div className="add-device" style={{ marginTop: "15px" }}>
            <div className="icon-add-device" onClick={backToPreviousPage}>
              <BsArrowReturnLeft />
            </div>
            <div className="text-add-device">Quay lại</div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default DetailService;
