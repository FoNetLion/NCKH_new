import { Breadcrumb, BreadcrumbProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  _items: Array<{
    path: string;
    label: string;
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }>;
};

const BreadcrumbCustom: React.FC<Props & BreadcrumbProps> = ({
  _items,
  ...rest
}) => {
  const breadcrumbItems = [
    // {
    //   title: <Link to={DASHBOARD}>Dashboard</Link>,
    //   key: "dashboard",
    // },
    ..._items.map((item, index) => {
      const isDisabled = item.path === ""
      return {
        title: (
          <Link
            to={item.path}
            style={{ 
              color: index === _items.length - 1 ? "white" : "#c4d9d6",
              pointerEvents: isDisabled ? "none" : "auto"
            }}
            onClick={item?.onClick ? item?.onClick : () => {}}
          >
            {item.label}
          </Link>
        ),
        key: index,
      }
    }),
  ];
  return (
    <div>
      <Breadcrumb {...rest} items={breadcrumbItems} />
    </div>
  );
};

export default BreadcrumbCustom;
