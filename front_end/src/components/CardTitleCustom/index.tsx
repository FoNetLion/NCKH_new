import { Row, Typography } from "antd";
import React from "react";
import "./style.scss";
import Icons from "../../assets/icons";
import ButtonCustom from "../ButtonCustom";

type Props = {
  title: string;
  color?: string;
  addFunction?: () => void;
  saveFunction?: () => void;
};

const CardTitleCustom: React.FC<Props> = ({
  title,
  color,
  addFunction,
  saveFunction,
}) => {
  return (
    <div className="card-title-container">
      <Row justify={"space-between"} style={{ marginBottom: "4px" }}>
        <Typography.Text className="title" style={{ color: color }}>
          {title}
        </Typography.Text>
        {addFunction ? (
          <ButtonCustom
            type="primary"
            icon={<Icons.add />}
            size="small"
            onClick={addFunction}
            label="Thêm mới"
            bgColor="#2862AF"
          />
        ) : (
          <></>
        )}
        {saveFunction ? (
          <ButtonCustom
            type="primary"
            size="small"
            onClick={saveFunction}
            label="Lưu"
            bgColor="#2862AF"
          />
        ) : (
          <></>
        )}
      </Row>
    </div>
  );
};

export default CardTitleCustom;
