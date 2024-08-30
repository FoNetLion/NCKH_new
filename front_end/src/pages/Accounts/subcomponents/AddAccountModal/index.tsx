import React from "react";
import {
    Modal,
    Button,
    Typography,
    Space,
    Row,
    Form,
    Input,
    Select,
    Col,
    message
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import * as Yup from 'yup';
import "./style.scss";
import { useFormik } from "formik";
import { AddAccountData } from "../../../../constants/types/common.type";
import { accountApi } from "../../../../apis/account";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configs/configureStore";
import { getAllAccount } from "../../store/accountSlice";


const { Option } = Select;

type Props = {
    isOpenAddAccountModal: boolean;
    closeAddAccountModal: () => void;
    addAccountMessage: (content:string,status:number) => void;
};

const addAccountSchema = Yup.object().shape({
    ownerName: Yup.string().required(
        'Bạn chưa nhập tên chủ sở hữu!'
    ),
    workingUnit: Yup.string().required(
        'Bạn chưa nhập đơn vị làm việc!'
    ),
    username: Yup.string().required(
        'Bạn chưa nhập tên tài khoản!'
    ),
    password: Yup.string().required(
        'Bạn chưa nhập mật khẩu!'
    ),
    role: Yup.string().required(
        'Bạn chưa nhập quyền!'
    ),
    status: Yup.number().required(
        'Bạn chưa nhập trạng thái!'
    ),
})

export const AddAccountModal: React.FC<Props> = ({ isOpenAddAccountModal, closeAddAccountModal, addAccountMessage}) => {

    const accountState = useSelector((state: RootState)=>state.accountSlice);

    const dispatch = useDispatch();

    const initialAddAccountData: AddAccountData = {
        ownerName: "",
        workingUnit: "",
        username: "",
        password: "",
        role: "",
        status: 1,
        customerId: "",
    }
    const formAddAccount = useFormik({
        initialValues: initialAddAccountData,
        validationSchema: addAccountSchema,
        onSubmit: async (data) => {
            const addAccountData: AddAccountData = {}
            addAccountData.ownerName = data.ownerName;
            addAccountData.workingUnit = data.workingUnit;
            addAccountData.username = data.username;
            addAccountData.role = data.role;
            addAccountData.password = data.password
            addAccountData.status = data.status;
            addAccountData.customerId = data.customerId;
            try {
                const response = await accountApi.add(addAccountData);
                addAccountMessage(response.data.content,response.data.code)
                const params: any= {
                    limit: accountState.limit,
                    page: accountState.page,
                }
                dispatch(getAllAccount(params))
            } catch (error: any) {
                message.error('Thêm tài khoản thất bại!')
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
                        <Typography className="modal-title">Thêm tài khoản</Typography>
                        <Button
                            className="close-button-modal"
                            shape="circle"
                            icon={<CloseOutlined />}
                            onClick={closeAddAccountModal}
                        />
                    </Row>
                    <Form layout="vertical" 
                        onFinish={formAddAccount.handleSubmit}
                        >
                        <Form.Item
                            label="Tên chủ sở hữu"
                            validateStatus={
                                formAddAccount.errors.ownerName && formAddAccount.touched.ownerName
                                    ? "error"
                                    : ""
                            }
                            help={
                                formAddAccount.touched.ownerName && formAddAccount.errors.ownerName
                            }>
                            <Input
                                value={formAddAccount.values.ownerName}
                                className="input-create-modal"
                                name="ownerName"
                                onChange={formAddAccount.handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị làm việc"
                            validateStatus={
                                formAddAccount.errors.workingUnit && formAddAccount.touched.workingUnit
                                    ? "error"
                                    : ""
                            }
                            help={
                                formAddAccount.touched.workingUnit && formAddAccount.errors.workingUnit
                            }>
                            <Input
                                value={formAddAccount.values.workingUnit}
                                className="input-create-modal"
                                name="workingUnit"
                                onChange={formAddAccount.handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tên tài khoản"
                            validateStatus={
                                formAddAccount.errors.username && formAddAccount.touched.username
                                    ? "error"
                                    : ""
                            }
                            help={
                                formAddAccount.touched.username && formAddAccount.errors.username
                            }>
                            <Input
                                value={formAddAccount.values.username}
                                className="input-create-modal"
                                name="username"
                                onChange={formAddAccount.handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            validateStatus={
                                formAddAccount.errors.password && formAddAccount.touched.password
                                    ? "error"
                                    : ""
                            }
                            help={
                                formAddAccount.touched.password && formAddAccount.errors.password
                            }>
                            <Input.Password
                                value={formAddAccount.values.password}
                                className="input-create-modal"
                                name="password"
                                onChange={formAddAccount.handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Quyền"
                            validateStatus={
                                formAddAccount.errors.role && formAddAccount.touched.role
                                    ? "error"
                                    : ""
                            }
                            help={
                                formAddAccount.touched.role && formAddAccount.errors.role
                            }>
                            <Input
                                value={formAddAccount.values.role}
                                className="input-create-modal"
                                name="role"
                                onChange={formAddAccount.handleChange}
                            />
                        </Form.Item>
                        
                        <Form.Item name="status" label="Trạng thái"
                            validateStatus={
                                formAddAccount.errors.status && formAddAccount.touched.status
                                    ? "error"
                                    : ""
                            }
                            help={
                                formAddAccount.touched.status && formAddAccount.errors.status
                            }>
                            <Select
                                className="input-create-modal"
                                value={formAddAccount.values.status}
                                onChange={formAddAccount.handleChange}
                            >
                                <Option value="1">Active</Option>
                                <Option value="0">Banned</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Mã khách hàng"
                            validateStatus={
                                formAddAccount.errors.customerId && formAddAccount.touched.customerId
                                    ? "error"
                                    : ""
                            }
                            help={
                                formAddAccount.touched.customerId && formAddAccount.errors.customerId
                            }>
                            <Input
                                value={formAddAccount.values.customerId}
                                className="input-create-modal"
                                name="customerId" 
                                onChange={formAddAccount.handleChange}
                                />
                        </Form.Item>
                        <Form.Item>
                            <Row justify={'space-between'} style={{ paddingTop: '20px' }}>
                                <Col span={11}>
                                    <Button className="cancel-add-account" onClick={closeAddAccountModal}>Hủy bỏ</Button>
                                </Col>
                                <Col span={11}>
                                    <Button className="submit-add-account" htmlType="submit">Thêm</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Space>
            </Modal>
        </div>
    );
};

