import React, { MouseEvent, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./addNumber.css";

type addnumberModalType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  stt:string
  date:string
  expire:string
  serviceName:string
};

const AddNumberModal = ({ showModal, setShowModal,date,expire,serviceName,stt }: addnumberModalType) => {
  return (
    <Modal
      title="Số thứ tự được cấp"
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={[
        <p className="footer-text">Thời gian cấp: {date}</p>,
        <p className="footer-text">Hạn sử dụng: {expire}</p>,
      ]}
    >
      <p className="number">{stt}</p>
      <p>
        DV: {serviceName} <span>(tại quầy số 1)</span>
      </p>
    </Modal>
  );
};

export default AddNumberModal;
