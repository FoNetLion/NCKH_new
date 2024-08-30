import React, { FC } from "react";
import './style.scss'
import { Space, Typography } from "antd";
import CardTitleCustom from "../../../../components/CardTitleCustom";
type Props = {
  title: string;
  value: number;
  icon?: React.ReactNode;
}

const DashboardGeneralItem: FC<Props> = ({ title, value, icon }) => {

  return (
      <Space className="db-generalItem-wrapper">
        <Space direction="vertical">
          <CardTitleCustom title={title} />
          <Typography>{value}</Typography>
        </Space>
        <Space className="db-gnIcon-wrapper">
          {icon}
        </Space>
      </Space>
  );
};

export default DashboardGeneralItem;
