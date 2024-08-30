import {Button, ButtonProps} from "antd";
import React from "react";
import "./style.scss";

type Props = {
  label?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  size?: "small" | "middle" | "large";
  style?: any;
};

const ButtonCustom: React.FC<Props & ButtonProps> = ({
  label,
  icon,
  size,
  bgColor,
  style,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      size={size ?? "small"}
      style={{background: bgColor, ...style}}
      icon={icon}
      className={`button-custom ${rest.className}`}
    >
      {label}
    </Button>
  );
};

export default ButtonCustom;
