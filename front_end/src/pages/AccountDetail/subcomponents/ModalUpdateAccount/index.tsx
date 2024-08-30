import React from "react";
import {
    Modal,
    Button,
    Typography,
    Space,
    Row,
    Form,
    Input,
    Col,
    message
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import * as Yup from 'yup';
import "./style.scss";
import { useFormik } from "formik";
import { UpdateAccountData } from "../../../../constants/types/common.type";
import { Account } from "../../../../constants/types/common.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../configs/configureStore";
import { fetchAsyncAccDetail } from "../../store/AccountDetailSlice";
import { accountApi } from "../../../../apis/account";



type Props = {
    isOpenAddAccountModal: boolean;
    closeAddAccountModal: () => void;
    updateAccountMessage: (content:string,status:number) => void;
    account: Account;
};


export const UpdateAccountModal: React.FC<Props> = ({ account, isOpenAddAccountModal, closeAddAccountModal, updateAccountMessage}) => {
    const dispatch = useDispatch<AppDispatch>();
    const initialUpdateAccountData: UpdateAccountData = {
        accountId: account.accountId,
        ownerName: account.ownerName,
        workingUnit: account.workingUnit,
        username: account.username,
        role: account.role,
        customerId: account.customerId,
    }
    const formUpdateAccount = useFormik({
        initialValues: initialUpdateAccountData,
        onSubmit: async (data) => {
            const updateAccountData: UpdateAccountData = {}
            updateAccountData.accountId = account.accountId;
            updateAccountData.ownerName = data.ownerName || account.ownerName;
            updateAccountData.workingUnit = data.workingUnit || account.workingUnit;
            updateAccountData.username = data.username || account.username;
            updateAccountData.role = data.role || account.role;
            updateAccountData.customerId = data.customerId || account.customerId;
            try {
                const response = await accountApi.update(updateAccountData);
                updateAccountMessage(response.data.message,response.data.code);
                dispatch(fetchAsyncAccDetail(String(account.username)));
                closeAddAccountModal()
            } catch (error: any) {
                message.error('Sửa tài khoản thất bại!')
            }
        }
    })
    return (
        <div className="add-account-container">
            <Modal
                className="add-account-modal"
                open={isOpenAddAccountModal}
                closable={false}
                footer={null}
                onCancel={closeAddAccountModal}
            >
                <Space
                    direction="vertical"
                    className="space-add-account"
                    size={"middle"}
                >
                    <Row justify={"space-between"}>
                        <Typography className="modal-title">Sửa tài khoản</Typography>
                        <Button
                            className="close-button-modal"
                            shape="circle"
                            icon={<CloseOutlined />}
                            onClick={closeAddAccountModal}
                        />
                    </Row>
                    <Form layout="vertical" 
                        onFinish={formUpdateAccount.handleSubmit}
                        >
                        <Form.Item
                            label="Tên chủ sở hữu"
                            validateStatus={
                                formUpdateAccount.errors.ownerName && formUpdateAccount.touched.ownerName
                                    ? "error"
                                    : ""
                            }
                            help={
                                formUpdateAccount.touched.ownerName && formUpdateAccount.errors.ownerName
                            }>
                            <Input
                                value={formUpdateAccount.values.ownerName}
                                defaultValue = {account.ownerName}
                                className="input-create-modal"
                                name="ownerName"
                                onChange={formUpdateAccount.handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị làm việc"
                            validateStatus={
                                formUpdateAccount.errors.workingUnit && formUpdateAccount.touched.workingUnit
                                    ? "error"
                                    : ""
                            }
                            help={
                                formUpdateAccount.touched.workingUnit && formUpdateAccount.errors.workingUnit
                            }>
                            <Input
                                // value={formUpdateAccount.values.workingUnit}
                                defaultValue = {account.workingUnit}
                                className="input-create-modal"
                                name="workingUnit"
                                onChange={formUpdateAccount.handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tên tài khoản"
                            validateStatus={
                                formUpdateAccount.errors.username && formUpdateAccount.touched.username
                                    ? "error"
                                    : ""
                            }
                            help={
                                formUpdateAccount.touched.username && formUpdateAccount.errors.username
                            }>
                            <Input
                                // value={formUpdateAccount.values.username}
                                defaultValue = {account.username}
                                className="input-create-modal"
                                name="username"
                                onChange={formUpdateAccount.handleChange}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            label="Quyền"
                            validateStatus={
                                formUpdateAccount.errors.role && formUpdateAccount.touched.role
                                    ? "error"
                                    : ""
                            }
                            help={
                                formUpdateAccount.touched.role && formUpdateAccount.errors.role
                            }>
                            <Input
                                // value={formUpdateAccount.values.role}
                                defaultValue = {account.role}
                                className="input-create-modal"
                                name="role"
                                onChange={formUpdateAccount.handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mã khách hàng"
                            validateStatus={
                                formUpdateAccount.errors.customerId && formUpdateAccount.touched.customerId
                                    ? "error"
                                    : ""
                            }
                            help={
                                formUpdateAccount.touched.customerId && formUpdateAccount.errors.customerId
                            }>
                            <Input
                                // value={formUpdateAccount.values.customerId}
                                defaultValue = {account.customerId}
                                className="input-create-modal"
                                name="customerId" 
                                onChange={formUpdateAccount.handleChange}
                                />
                        </Form.Item>
                        <Form.Item>
                            <Row justify={'space-between'} style={{ paddingTop: '20px' }}>
                                <Col span={11}>
                                    <Button className="cancel-add-account" onClick={closeAddAccountModal}>Hủy bỏ</Button>
                                </Col>
                                <Col span={11}>
                                    <Button className="submit-add-account" htmlType="submit">Sửa</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Space>
            </Modal>
        </div>
    );
};

