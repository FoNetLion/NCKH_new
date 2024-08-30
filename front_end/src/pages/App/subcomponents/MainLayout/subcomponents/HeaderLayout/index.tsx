import React, { useState, ReactNode, useEffect } from "react";
import {
  Row,
  Col,
  Space,
  Typography,
  Avatar,
  Input,
  Button,
  Dropdown,
  Drawer,
  Divider,
  Menu,
} from "antd";
import "./style.scss";
import {
  SearchOutlined,
  BellFilled,
  SettingOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  ApartmentOutlined,
  AppstoreFilled,
  FileTextOutlined,
  LockFilled,
  SettingFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAccountLoggedIn, getIsLoggedIn, logout } from "../../../../store/appSlice";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";

import {
  CUSTOMER,
  ACCOUNT,
  SETTING,
  DASHBOARD,
  LOG,
} from "../../../../../../routes/route.constant";
import { AppDispatch, RootState } from "../../../../../../configs/configureStore";
import { searchKey } from "../../../../../Keys/store/keySlice";
import { searchAccount } from "../../../../../Accounts/store/accountSlice";
import { accountApi } from "../../../../../../apis/account";
import { Account } from "../../../../../../constants/types/common.type";
import BreadcrumbCustom from "../../../../../../components/BreadcrumbCustom";

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={DASHBOARD}>Dashboard</Link>, '1', <AppstoreFilled />,),
  getItem('Management', '2', <ApartmentOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  // getItem(<Link to={LOG_PACKAGE}>Rule</Link>, '5', <LockFilled />),
  getItem(<Link to={LOG}>Logs</Link>, '6', <FileTextOutlined />),
  getItem(<Link to={SETTING}>Setting</Link>, '7', <SettingFilled />),
];

const HeaderLayout = () => {
  const [accountLoggedIn, setAccountLoggedIn] = useState<Account>();
  const appState = useSelector((state: RootState) => state.appSlice);
  const [isOpenDrawer, SetIsOpenDrawer] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const username = String(localStorage.getItem('username'));
  if (!username) {
    navigate('/login')
  }
  const handleGetAccoutLoggedIn = async () => {
    try {
      const { data } = await accountApi.getDetail({ username: username });
      setAccountLoggedIn(data);
    } catch (error: any) {
      throw new Error;
    }
  }
  useEffect(() => {
    handleGetAccoutLoggedIn();
  }, [])
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
  }

  const handleMenuDrawer = () => {
    SetIsOpenDrawer(!isOpenDrawer);
  };
  const accountDetail = () => {
    navigate(`/account/${accountLoggedIn?.username}`)
  }
  const closeDrawerMenu = () => {
    SetIsOpenDrawer(false);
  }


  const action: MenuProps['items'] = [
    {
      key: 'detail',
      label: (
        <Space onClick={accountDetail}>
          <UserOutlined />
          <Typography className="header-accountAction">Chi tiết tài khoản</Typography>
        </Space>
      ),
    },
    {
      key: 'logout',
      label: (
        <Space onClick={handleLogout}>
          <LogoutOutlined />
          <Typography className="header-accountAction">Đăng xuất</Typography>
        </Space>),
    }
  ];
  return (
    <>
      <div className="header-container w-100 mobileHidden">
        <Space direction="horizontal" style={{ width: "16%", justifyContent: "center", marginRight: "30px" }}>
          {/* <Icon component={CameraSVG} className="slide-logo-icon" /> */}
          {/* <Typography className="slide-tittle">WAF Manager</Typography> */}
        </Space>
        <Row className="w-100 h-100" justify={"space-between"} align={"middle"}>
          <Col span={7}>
          <Col>
            <BreadcrumbCustom _items={appState.breadCrumb} />
          </Col>
          </Col>
          <Col>
            <Space className="infoUserHeader" size={"large"}>
              <Button
                shape="circle"
                className="account-avatar"
                icon={<BellFilled />}
              />
              <Button
                shape="circle"
                className="account-avatar"
                icon={<SettingOutlined />}
              />
              <Space size={"small"}>
                <Typography className="account-name">
                  {accountLoggedIn?.username}
                </Typography>
                <Dropdown menu={{ items: action }} trigger={['click']} placement="bottomLeft">
                  <Button shape="circle" style={{ backgroundColor: 'transparent', padding: '0', border: 'none' }}>
                    <Avatar
                      className="account-avatar"
                      src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                    />
                  </Button>
                </Dropdown>
              </Space>
            </Space>
          </Col>
        </Row>
      </div>
      <div className="header-container w-100 mobileVisible">
        <Row className="w-100 h-100" justify={"space-between"} align={"middle"}>
          <Space direction="horizontal" size={"large"}>
            <Typography className="slide-tittle">WAF Manager</Typography>
          </Space>
          <Button type="primary" onClick={handleMenuDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer
            open={isOpenDrawer}
            closeIcon={false}
            closable={false}
            className="drawer-container"
            width={260}
            onClose={closeDrawerMenu}
            title={
              <Space direction="horizontal" size={"small"}>
                <Button
                  shape="circle"
                  className="account-avatar"
                  icon={<BellFilled />}
                />
                <Button
                  shape="circle"
                  className="account-avatar"
                  icon={<SettingOutlined />}
                />
                <Divider type="vertical" />
                <Dropdown menu={{ items: action }} trigger={['click']} placement="bottomLeft">
                  <Button shape="circle" style={{ backgroundColor: 'transparent', padding: '0', border: 'none' }}>
                    <Avatar
                      className="account-avatar"
                      src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                    />
                  </Button>
                </Dropdown>
                <Typography className="account-name">
                  {accountLoggedIn?.username}
                </Typography>
              </Space>
            }
          >
            <Row className="menuTab">
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                inlineIndent={10}
                items={items}
                mode="inline"
              />
            </Row>
          </Drawer>
        </Row>
      </div>
    </>
  );
};

export default HeaderLayout;
