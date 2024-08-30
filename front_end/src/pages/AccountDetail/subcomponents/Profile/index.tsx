import React, { useState } from "react";
import "./style.scss";
import { Avatar, Button, Row, Space, Tag, Typography, message } from "antd";
import { ReactComponent as Upload } from "../../../../assets/images/svg/Upload.svg";
import Icon from '@ant-design/icons/lib/components/Icon';
import { Account } from '../../../../constants/types/common.type';
import { UpdateAccountModal } from "../ModalUpdateAccount";

export type AccountDataProps = {
  account: Account
}

const Profile: React.FC<AccountDataProps> = ({ account }) => {
  const [isOpenUpdateAccModal, setIsOpenUpdateAccModal] = useState<boolean>(false);
  const [messageUpdateAccount, updateAccountMessageContent] = message.useMessage();
  const openUpdateAccModel = () => {
    setIsOpenUpdateAccModal(true);
  }
  const closeUpdateAccountModal = () => {
    setIsOpenUpdateAccModal(false);
  }
  const updateAccountMessage = (content: string, status: number) => {
    if (status === 200) {
      messageUpdateAccount.open({
        type: 'success',
        content: content
      })
    } else {
      messageUpdateAccount.open({
        type: 'error',
        content: content
      })
    }
  }
  return (
    <div className='acc-profile-wrapper'>
      {updateAccountMessageContent}
      <UpdateAccountModal isOpenAddAccountModal={isOpenUpdateAccModal} closeAddAccountModal={closeUpdateAccountModal} updateAccountMessage={updateAccountMessage} account={account}></UpdateAccountModal>
      <Row align={"middle"} className="acc-detail-header" style={{ padding: '0 0 24px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }} justify='space-between'>
        <Space direction="horizontal" wrap align='center'>
          <Typography.Title level={4} className="acc-detail-header_title" style={{ color: 'white', margin: '0' }}>Thông tin tài khoản</Typography.Title>
          {account.status ? <Tag color="rgba(67, 214, 133, 0.1)" style={{ color: "#43D685", borderRadius: '60px', margin: '0 10px' }}>Active</Tag> :
            <Tag color="rgba(242, 91, 96, 0.1)" style={{ color: "#F25B60", borderRadius: '60px', margin: '0 10px' }}>Banned</Tag>}
        </Space>
        <Button size="large" className="acc-detail-header_btn" onClick={openUpdateAccModel}>
          Sửa
        </Button>
      </Row>
      <Row className="acc-detail-content">
        <Space
          className="acc-detail-content_left"
          style={{ display: "block", position: "relative" }}
        >
          <Avatar shape="circle" src="" size={120} />
          <Button className="acc-uploadAva_btn">
            <Icon
              component={Upload}
              className="account-uploadAva_icon"
              style={{ fontSize: "24px", color: "transparent" }}
            />
          </Button>
        </Space>
        <Space direction="vertical" className="acc-detail-content_rigth">
          <ul className="acc-detail-info">
            <li className="acc-detail-info_lable">
              <Typography.Paragraph className="acc-detail-info_lable-item">
                Tên khách hàng
              </Typography.Paragraph>
              <Typography.Paragraph className="acc-detail-info_lable-item">
                Tên tài khoản
              </Typography.Paragraph>
              <Typography.Paragraph className="acc-detail-info_lable-item">
                Đơn vị làm việc
              </Typography.Paragraph>
              <Typography.Paragraph className="acc-detail-info_lable-item">
                Ngày tạo
              </Typography.Paragraph>
              <Typography.Paragraph className="acc-detail-info_lable-item">
                Quyền
              </Typography.Paragraph>
            </li>
            <li className='acc-detail-info_value'>
              <Typography.Paragraph className='acc-detail-info_value-item'>{account.ownerName || "Unknown"}</Typography.Paragraph>
              <Typography.Paragraph className='acc-detail-info_value-item'>{account.username}</Typography.Paragraph>
              <Typography.Paragraph className='acc-detail-info_value-item'>{account.workingUnit}</Typography.Paragraph>
              <Typography.Paragraph className='acc-detail-info_value-item'>{account.dateCreate || "Unknown"}</Typography.Paragraph>
              <Typography.Paragraph className='acc-detail-info_value-item'>{account.role || "Unknown"}</Typography.Paragraph>
            </li>
          </ul>
        </Space>
      </Row>
    </div>
  );
};

export default Profile;
