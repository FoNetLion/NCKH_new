import {
    Row,
    Space,
    Typography,
    Button,
    Avatar,
    Menu,
    Modal,
    message,
    Col,
} from "antd";
import { UserCircleSVG, LockOutlineSVG, ArrowRightSVG, BannedSVG, UnbanSVG } from "../../assets/images";
import React, { ReactNode, useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Account } from "../../constants/types/common.type";
import Profile from "./subcomponents/Profile";
import ChangePassword from "./subcomponents/ChangePassword";
import Icon from "@ant-design/icons/lib/components/Icon";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAsyncAccDetail,
    getAccountDetail,
    removeSelectedAccount,
} from "./store/AccountDetailSlice";
import { AppDispatch } from "../../configs/configureStore";
import { accountApi } from "../../apis/account";
import { CloseOutlined } from "@ant-design/icons";

type MenuItem = {
    title: string;
    key: string;
    icon?: ReactNode;
};

const menudata: Array<MenuItem> = [
    {
        title: "Tài khoản",
        key: "account",
        icon: <UserCircleSVG />,
    },
    {
        title: "Đổi mật khẩu",
        key: "changepass",
        icon: <LockOutlineSVG />,
    },
];
const AccountDetail: React.FC = () => {
    const navigate = useNavigate();
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
    const [messageChangeStatus, changeStatusMessageContent] = message.useMessage();
    const [action, setAction] = useState("ban");
    const [tab, setTab] = useState("account");
    const { username } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const accDetail: Account = useSelector(getAccountDetail)

    useEffect(() => {
        dispatch(fetchAsyncAccDetail(String(username)));
        return () => {
            dispatch(removeSelectedAccount());
        }
    }, [dispatch, username])

    const confirmBan = () => {
        setIsOpenModalConfirm(true);
        setAction("ban")
    }
    const confirmActive = () => {
        setIsOpenModalConfirm(true);
        setAction("active")
    }
    const changeStatusAccount = async () => {
        try {
            const response = await accountApi.changeStatus({
                username: accDetail.username,
                status: accDetail.status === 1 ? 0 : 1
            })
            if (action === 'ban' && response.data.code === 200) {
                messageChangeStatus.open({
                    type: 'success',
                    content: "Cấm tài khoản thành công"
                })
            }
            else if (action === 'active' && response.data.code === 200) {
                messageChangeStatus.open({
                    type: 'success',
                    content: "Active tài khoản thành công"
                })
            }
            else {
                messageChangeStatus.open({
                    type: 'error',
                    content: response.data.message
                })
            }
        } catch (error: any) {
            console.log(error);
        }
        dispatch(fetchAsyncAccDetail(String(username)))
        setIsOpenModalConfirm(false)
    }

    return (
        <div className="acc-detail-wrapper">
            {changeStatusMessageContent}
            <Modal
                className="failedCreateKey-modal"
                open={isOpenModalConfirm}
                closable={false}
                footer={null}
                onCancel={() => setIsOpenModalConfirm(false)}
            >
                <Space
                    direction="vertical"
                    align="center"
                    className="space-failedCreateKey"
                    size={"middle"}>
                    <Row justify={"end"}>
                        <Button
                            className="close-button-modal"
                            shape="circle"
                            icon={<CloseOutlined />}
                            onClick={() => setIsOpenModalConfirm(false)}
                        />
                    </Row>
                    <Row justify={"center"}>
                        {action === 'ban' ? (
                            <Typography className="failed-title">
                                Bạn có chắc chắn muốn tạm dừng tài khoản này?
                            </Typography>
                        ) : (
                            <Typography className="failed-title">
                                Bạn có chắc chắn muốn khôi phục tài khoản này?
                            </Typography>
                        )}
                    </Row>
                    <Row justify={"center"}>
                        <Col span={12}>
                            <Button
                                className="failed-createKey-button cancel"
                                onClick={() => setIsOpenModalConfirm(false)}
                            >
                                Hủy bỏ
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                className="failed-createKey-button delete"
                                onClick={changeStatusAccount}
                            >
                                Xác nhận
                            </Button>
                        </Col>
                    </Row>
                </Space>
            </Modal>
            <Row align={"middle"} className="acc-detail-header">
                <Space direction="horizontal">
                    <Button className="acc-detail-header_icon-wrapper" onClick={() => { navigate('/accounts') }}>
                        <Icon component={ArrowRightSVG} className="acc-detail-header_icon" />
                    </Button>
                    <Typography.Title level={3} className="acc-detail-header_title" style={{ color: 'white', margin: '0' }}>{accDetail.ownerName || "Unkonwn"}</Typography.Title>
                </Space>
            </Row>
            <Row className="acc-detail-content">
                <Space direction="vertical" size={20} className="acc-detail-menu" style={{ borderRadius: '12px', width: '30%', height: 'fit-content' }}>
                    <Space className="acc-detail-menu_title">
                        <Avatar shape="circle" src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' size={80} />
                        <div>
                            <Typography.Title level={4} className="acc-detail-menu_title-name" style={{ margin: '0', padding: "2px 0", color: 'white' }}>{accDetail.ownerName || "Unknown"}</Typography.Title>
                            <Typography.Paragraph className="acc-detail-menu_title-des" style={{ margin: '0', color: "rgba(255, 255, 255, 0.4)" }}>Normal account</Typography.Paragraph>
                        </div>
                    </Space>
                    <Row className="w-100 menuTab">
                        <Menu mode="inline" inlineIndent={10}>
                            {menudata.map((menu) => (
                                <Menu.Item key={menu.key} icon={menu.icon} onClick={() => { setTab(menu.key) }}>
                                    {menu.title}
                                </Menu.Item>
                            ))}
                            {
                                accDetail.status ? <Button icon={<BannedSVG />} className="acc-action acc-ban" onClick={confirmBan}>Ban account</Button> : <Button icon={<UnbanSVG />} className="acc-action acc-unban" onClick={confirmActive}>Unban account</Button>
                            }

                        </Menu>
                    </Row>
                </Space>
                <div className="acc-detail-tab">
                    {tab === "account" ? <Profile account={accDetail}></Profile> : <ChangePassword account={accDetail}></ChangePassword>}
                </div>
            </Row>
        </div>

    );
};

export default AccountDetail;
