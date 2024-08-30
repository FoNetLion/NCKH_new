import React, { useState } from "react";
import Status from "../Status";
import { useNavigate } from "react-router-dom";
import { replaceParams } from "../../utils/route";
import { Button } from "antd";
import './style.scss'

type Props = {
  path: string;
  replace: Array<string>;
  status: number;
};

const StatusButton: React.FC<Props> = ({ path, replace, status }) => {
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState<boolean>(false);
  
  const handleHovering = () => {
    navigate(replaceParams(path, replace));
  };
  return (
    <div onMouseLeave={() => setIsHovering(false)}>
      {isHovering ? (
        <Button size="small" className="detailButton" onClick={handleHovering}>
          Chi tiết
        </Button>
      ) : (
        <Status status={status} onMouseEnter={() => setIsHovering(true)} />
      )}
    </div>
  );
};

export default StatusButton;
