import { Button, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import Icons from "../../assets/icons";
import { TrashRedSVG, EditSVG, EyeSVG, BlueEyeSVG, GreenEyeSVG } from "../../assets/images";
import { EyeOutlined } from "@ant-design/icons";

type Props = {
  editFunction?: any;
  substractFunction?: any;
  removeFunction?: any;
  downloadFunction?: any;
  viewFunction?: any;
  viewBlueFunction?: any;
  viewGreenFunction?: any;
  disable?: any;
  downloading?: boolean;
  downloadTooltip?: string;
};

const ListButtonActionUpdate: React.FC<Props> = ({
  substractFunction,
  downloadFunction,
  editFunction,
  removeFunction,
  viewFunction,
  viewBlueFunction,
  viewGreenFunction,
  downloading,
  disable = false,
  downloadTooltip,
}) => {
  const [openPopconfirm, setOpenPopconfirm] = useState({
    confirmSubtract: false,
    confirmRemove: false,
  });

  return (
    <Space size={"small"}>
      {removeFunction ? (
        <Popconfirm
          className="danger-confirm"
          title="Bạn muốn xóa?"
          onConfirm={() => {
            removeFunction();
            setOpenPopconfirm({ ...openPopconfirm, confirmRemove: false });
          }}
          disabled={disable}
        >
          <Button
            icon={<TrashRedSVG />}
            danger
            size="small"
            onClick={() =>
              setOpenPopconfirm({ ...openPopconfirm, confirmRemove: true })
            }
            type="text"
            disabled={disable}
          />
        </Popconfirm>
      ) : null}
      {editFunction ? (
        <Button
          icon={<EditSVG />}
          size="small"
          onClick={editFunction}
          type="text"
          disabled={disable}
        />
      ) : null}
      {downloadFunction ? (
        <Tooltip title={downloadTooltip}>
          <Button
            icon={<Icons.download />}
            onClick={downloadFunction}
            loading={downloading ?? false}
            type="text"
            size="small"
            disabled={disable}
          />
        </Tooltip>
      ) : null}
      {substractFunction ? (
        <Popconfirm
          className="danger-confirm"
          title="Bạn muốn xóa?"
          onConfirm={() => {
            substractFunction();
            setOpenPopconfirm({ ...openPopconfirm, confirmSubtract: false });
          }}
        >
          <Button
            icon={<Icons.sub />}
            danger
            size="small"
            onClick={() =>
              setOpenPopconfirm({ ...openPopconfirm, confirmSubtract: true })
            }
            type="primary"
          />
        </Popconfirm>
      ) : null}
      {viewFunction ? (
        <Button
          type="text"
          size="small"
          onClick={viewFunction}
          icon={<EyeOutlined />}
        />
      ) : null}
      {viewBlueFunction ? (
        <Button
          type="text"
          size="small"
          onClick={viewBlueFunction}
          icon={<BlueEyeSVG />}
        />
      ) : null}
      {viewGreenFunction ? (
        <Button
          type="text"
          size="small"
          onClick={viewGreenFunction}
          icon={<GreenEyeSVG />}
        />
      ) : null}
    </Space>
  );
};

export default ListButtonActionUpdate;
