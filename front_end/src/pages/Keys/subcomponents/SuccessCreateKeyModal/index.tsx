import React from "react";
import { Modal, Typography } from "antd";
import "./style.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Row, Space } from "antd";
import SucessIcon from "./subcomponents/SuccessIcon";

type Props = {
  isOpenKeySuccessCreateModal: boolean;
  closeOpenKeySuccessCreateModel: () => void;
  closeCreateKeyModal : () => void;
};

const SuccessCreateKeyModal: React.FC<Props> = ({ isOpenKeySuccessCreateModal,closeOpenKeySuccessCreateModel, closeCreateKeyModal }) => {
  
  const handleBack = () =>{
    closeOpenKeySuccessCreateModel();
    closeCreateKeyModal();
  }
  
  return (
    <div>
      <Modal
        className="successCreateKey-modal"
        open={isOpenKeySuccessCreateModal}
        closable={false}
        footer={null}
        onCancel={closeOpenKeySuccessCreateModel}
      >
        <Space
          direction="vertical"
          align="center"
          className="space-successCreateKey"
          size={"middle"}
        >
          <Row justify={"end"}>
            <Button
              className="close-button-modal"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={closeOpenKeySuccessCreateModel}
            />
          </Row>
          <Row justify={"center"}>
            <SucessIcon />
          </Row>
          <Row justify={"center"}>
            <Typography className="success-title">Thành công</Typography>
          </Row>
          <Row justify={"center"}>
            <Typography className="celebrate-title">
              Bạn đã tạo thành công một mã Key mới
            </Typography>
          </Row>
          <Row justify={"center"}>
            <Button className="button-comback" onClick={handleBack}>Trở về</Button>
          </Row>
        </Space>
      </Modal>
    </div>
  );
};

export default SuccessCreateKeyModal;
