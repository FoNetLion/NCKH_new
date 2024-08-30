import React from "react";
import { Menu, Row, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { ApartmentOutlined, SettingFilled, AppstoreFilled, LockFilled, FileTextOutlined } from "@ant-design/icons";
import {
  CUSTOMER,
  ACCOUNT,
  SETTING,
  DASHBOARD,
  LOG,
  LOG_PACKAGE,
  FLOW_MANAGEMENT,
  AGENT_MANAGEMENT,
  ALERT,
  RULE_MANAGEMENT
} from "../../../../../../routes/route.constant";
import { Link } from "react-router-dom";

import "./style.scss";
import { useDispatch } from "react-redux";
import { changeActiveTab } from "../../../../store/appSlice";


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
  getItem(<Link to={DASHBOARD}>Bảng Điều Khiển</Link>, '1', <AppstoreFilled />,),
  getItem(<Link to={FLOW_MANAGEMENT}>Danh Sách FLow</Link>, '2', <ApartmentOutlined />),
  getItem(<Link to={AGENT_MANAGEMENT}>Quản Lý Máy</Link>, '3', <AppstoreFilled />),
  getItem(<Link to={ALERT}>Thông Báo</Link>, '4', <AppstoreFilled />),
  // getItem( <Link to={RULE}>Rule</Link>,'5', <AppstoreFilled />,
  //   getItem( <Link to={RULE}>Rule</Link>, '3', <AppstoreFilled />),
  // // getItem(<Link to={}>Thông Báo</Link>, '4', <AppstoreFilled />),
  // ) 

  getItem('Rule', '5', <AppstoreFilled />, [
    getItem(<Link to={LOG_PACKAGE}>Log</Link>, '5-1', <AppstoreFilled />),
    getItem(<Link to={RULE_MANAGEMENT}>Quản Lý Rule</Link>, '5-2', <AppstoreFilled />)
    // getItem(<Link to={`${RULE}/2`}>MannagerRule</Link>, '5-2', <AppstoreFilled />),
  ])
];
export const SideBar: React.FC = () => {
  return (
    <div className="sideBar-container">
      <Space direction="vertical" size={20}>
        <Row className="w-100 menuTab">
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            inlineIndent={10}
            items={items}
            mode="inline"
          />
        </Row>
      </Space>
    </div >
  );
};
