import React from "react";
import "./style.scss";
import LoginForm from "./subcomponents/LoginForm";
import { Space } from "antd";
import IconModel from "./subcomponents/IconModel";
import {StatisticTabSVG, WordReportTypeSVG, SeeSampleSVG } from "../../assets/images";
import Icon from "@ant-design/icons";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="image-background">
        <Space
          className="main-icon-container"
          direction="horizontal"
          size={"large"}
        >
          <IconModel
            fileName="hopnoibo260523.mp4"
            size="Kích thước 20.6 MB"
            IconModel={StatisticTabSVG}
          />
          <div className="transition-icon-container">
            <Icon className="icon-transition-login" component={SeeSampleSVG} />
          </div>
          <IconModel
            fileName="hopnoibo260523.mp4"
            size="Kích thước 8.1 MB"
            IconModel={WordReportTypeSVG}
          />
        </Space>
      </div>
      <div className="login-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
