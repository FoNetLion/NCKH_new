import React from "react";
import { Space, Typography } from "antd";
import './style.scss'
import Icon from "@ant-design/icons";

type Props = {
    fileName: string;
    size: string;
    IconModel: any
}

const IconModel: React.FC<Props> = ({fileName,size,IconModel}) => {
  return (
    <div className="input-model">
      <Space direction="vertical">
        <div className="icon-container">
          <Icon className="icon-input-login" component={IconModel} />
        </div>
        <Typography className="tx-1">{fileName}</Typography>
        <Typography className="tx-2">{size}</Typography>
      </Space>
    </div>
  );
};

export default IconModel;
