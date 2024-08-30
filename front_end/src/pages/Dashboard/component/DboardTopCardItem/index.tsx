import React, { FC } from "react";
import './style.scss'
import { Space, Typography } from "antd";
import CardTitleCustom from "../../../../components/CardTitleCustom";
type Props = {
  title: string;
  value: Array<any>;
  icon?: React.ReactNode;
}

const DboardTopCardItem: FC<Props> = ({ title, value, icon }) => {
  return (
    <Space className="db-topCardItem-wrapper">
      <Space direction="vertical">
        <CardTitleCustom title={title} />
        {value.map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
      </Space>
        <Space className="db-topCardIcon-wrapper">
          {icon}
        </Space>
    </Space>
  );
};

export default DboardTopCardItem;
