import {
  Row,
  Space,
  Typography,
  Card,
  Form,
  Select,
  Col,
  Button,
  message,
} from "antd";
import React, {useState} from "react";
import Icon, { PlusOutlined } from "@ant-design/icons";
import './style.scss'
import TableAccount from "./subcomponents/TableAccount";
import { AddAccountModal } from "./subcomponents/AddAccountModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configs/configureStore";
import { searchAccount } from "./store/accountSlice";

const Accounts = () => {
  const [status, setStatus] = useState<number>(-1);

  const dispatch = useDispatch();

  const accountState = useSelector((state: RootState) => state.accountSlice);
  
  const [isOpenAddAccountModal, setIsOpenAddAccountModal] =
    useState<boolean>(false);
  
  const [messageAddAccount, addAccountMessageContent] = message.useMessage();
  
  const openAddAccountModal = () => {
    setIsOpenAddAccountModal(true);
  };

  const closeAddAccountModal = () => {
    setIsOpenAddAccountModal(false);
  };

  const changeStatus = (status: number) => {
    const params: any = {
      limit: accountState.limit,
      page: accountState.page,
      status: status,
    };
    setStatus(status);
    dispatch(searchAccount(params));
  }

  const addAccountMessage = (content:string, status: number) => {
      if(status === 200){
        messageAddAccount.open({
          type: 'success',
          content: content
        })
      }else{
        messageAddAccount.open({
          type: 'error',
          content: content
        })
      }
  }
  return (
    <div className="accounts-wrapper">
      {addAccountMessageContent}
      <AddAccountModal isOpenAddAccountModal={isOpenAddAccountModal} closeAddAccountModal={closeAddAccountModal} addAccountMessage={addAccountMessage}/>
      <Space className="space-accounts" direction="vertical">
        <Row>
          <Typography className="table-tittle">Danh sách tài khoản</Typography>
        </Row>
        <Row>
          <Card className="card-accounts">
            <Row justify={"space-between"}>
              <Col>
                <Form className="form-accounts">
                  <Form.Item>
                    <Space wrap>
                      {/* <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        // onChange={handleChange}
                        options={[
                          { value: "all", label: "All level" },
                          { value: "junior", label: "Junior" },
                          { value: "senior", label: "Senior" },
                        ]}
                      />
                      <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        options={[
                          { value: "all", label: "All country" },
                          { value: "vietnam", label: "VietNam" },
                          { value: "england", label: "England" },
                        ]}
                      /> */}
                      <Select
                        value={status}
                        defaultValue={status}
                        style={{ width: 120 }}
                        onChange={changeStatus}
                        options={[
                          { value: -1, label: "All status" },
                          { value: 1, label: "Active" },
                          { value: 0, label: "Banned" },
                        ]}
                      />
                    </Space>
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Button size="large" className="button-plus-customer" onClick={openAddAccountModal}>
                  <Space direction="horizontal">
                    <Typography>Thêm mới</Typography>
                    <div className="plus-icon-container">
                      <Icon
                        component={
                          PlusOutlined as React.ForwardRefExoticComponent<any>
                        }
                      />
                    </div>
                  </Space>
                </Button>
              </Col>
            </Row>
            <TableAccount />
          </Card>
        </Row>
      </Space>
    </div>
  );
};

export default Accounts;
