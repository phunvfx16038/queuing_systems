import React, { MouseEvent, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./addNumber.css";
import { useNavigate } from "react-router-dom";

type ConfirmModalType = {
  showConfirmModal: boolean;
  setShowConfirmModal: (value: boolean) => void;
  type: string;
};

const ConfirmModal = ({
  showConfirmModal,
  setShowConfirmModal,
  type,
}: ConfirmModalType) => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (type === "add") {
      setContent("Dữ liệu đã được thêm mới");
    } else if (type === "edit") {
      setContent("Dữ liệu đã được cập nhật");
    }
  }, [type]);

  const handleOk = () => {
    setShowConfirmModal(false);
    navigate(-1);
  };

  return (
    <Modal
      open={showConfirmModal}
      width={400}
      footer={[
        <Button
          key="back"
          style={{ backgroundColor: "#0e94f3", color: "white" }}
          onClick={handleOk}
        >
          OK
        </Button>,
      ]}
    >
      <p style={{ fontSize: "24px" }}>{content}</p>
    </Modal>
  );
};

export default ConfirmModal;
