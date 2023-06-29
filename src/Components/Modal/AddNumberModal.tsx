import React, { MouseEvent, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./addNumber.css";

type addnumberModalType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const AddNumberModal = ({ showModal, setShowModal }: addnumberModalType) => {
  return (
    <Modal
      title="Số thứ tự được cấp"
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={[
        <p className="footer-text">Thời gian cấp: 09:20 11/10/2021</p>,
        <p className="footer-text">Hạn sử dụng: 17:20 11/10/2021</p>,
      ]}
    >
      <p className="number">202120</p>
      <p>
        DV: Khám răng hàm mặt <span>(tại quầy số 1)</span>
      </p>
    </Modal>
  );
};

export default AddNumberModal;
