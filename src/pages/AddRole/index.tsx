import React, { useState } from "react";
import { Layout, Input, Row, Col, Form, Button, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { roleProp } from "../../propTypes/roleType";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { addRoleManage } from "../../app/roleSlice";
import { userDiaryType } from "../UserDiary";
import { addDiary } from "../../app/diarySlice";
import ConfirmModal from "../../Components/Modal/ConfirmModal";

const { Content } = Layout;
const { TextArea } = Input;

const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];
const defaultCheckedList = ["Chức năng x"];
const CheckboxGroup = Checkbox.Group;
const AddRole = () => {
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector((state) => state.auth.login);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [checkedListA, setCheckedListA] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [checkedListB, setCheckedListB] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminateA, setIndeterminateA] = useState(false);
  const [checkAllA, setCheckAllA] = useState(false);
  const [indeterminateB, setIndeterminateB] = useState(false);
  const [checkAllB, setCheckAllB] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const onChangeRoleA = (list: CheckboxValueType[]) => {
    setCheckedListA(list);
    setIndeterminateA(!!list.length && list.length < plainOptions.length);
    setCheckAllA(list.length === plainOptions.length);
  };

  const onCheckAllAChangeRoleA = (e: CheckboxChangeEvent) => {
    setCheckedListA(e.target.checked ? plainOptions : []);
    setIndeterminateA(false);
    setCheckAllA(e.target.checked);
  };

  const onChangeRoleB = (list: CheckboxValueType[]) => {
    setCheckedListB(list);
    setIndeterminateB(!!list.length && list.length < plainOptions.length);
    setCheckAllB(list.length === plainOptions.length);
  };

  const onCheckAllAChangeRoleB = (e: CheckboxChangeEvent) => {
    setCheckedListB(e.target.checked ? plainOptions : []);
    setIndeterminateB(false);
    setCheckAllB(e.target.checked);
  };

  const onFinish = (values: roleProp) => {
    const newRoleManage = {
      ...values,
      roleA: checkedListA,
      roleB: checkedListB,
    };
    const diaryData: userDiaryType = {
      userName: loginUser.user_name,
      action: `Thực hiện thêm vai trò: ${values.role_name}`,
    };
    dispatch(addDiary(diaryData));
    dispatch(addRoleManage(newRoleManage));
    setShowConfirmModal(true);
  };

  return (
    <Content
      style={{
        margin: "24px 16px 0",
        backgroundColor: "#EAEAEC",
      }}
    >
      <h3>Danh sách vai trò</h3>
      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px 20px 50px 20px",
            borderRadius: "5px",
          }}
        >
          <Row gutter={[16, 16]}>
            <h4 style={{ fontSize: "20px", display: "block", width: "100%" }}>
              Thông tin vai trò
            </h4>
            <Col span={12}>
              <Form.Item
                name="role_name"
                label="Tên vai trò"
                rules={[
                  {
                    required: true,
                    message: "Tên vai trò không được để trống!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập tên vai trò"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Mô tả vai trò không được để trống!",
                  },
                ]}
              >
                <TextArea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <div>
                <span style={{ color: "red" }}>*</span>
                Là trường thông tin bắt buộc
              </div>
            </Col>
            <Col span={12}>
              <div>
                Phân quyền chức năng
                <span style={{ color: "red" }}>*</span>
              </div>
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#FFF2E7",
                  borderRadius: "5px",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "18px" }}>Nhóm chức năng A</h4>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Checkbox
                      indeterminate={indeterminateA}
                      onChange={onCheckAllAChangeRoleA}
                      checked={checkAllA}
                    >
                      Tất cả
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <CheckboxGroup
                      options={plainOptions}
                      value={checkedListA}
                      onChange={onChangeRoleA}
                      style={{ display: "flex", flexDirection: "column" }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <h4 style={{ fontSize: "18px" }}>Nhóm chức năng B</h4>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Checkbox
                      indeterminate={indeterminateB}
                      onChange={onCheckAllAChangeRoleB}
                      checked={checkAllB}
                    >
                      Tất cả
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <CheckboxGroup
                      options={plainOptions}
                      value={checkedListB}
                      onChange={onChangeRoleB}
                      style={{ display: "flex", flexDirection: "column" }}
                    />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button cancle"
          >
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
      <ConfirmModal
        type="add"
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
      />
    </Content>
  );
};

export default AddRole;
