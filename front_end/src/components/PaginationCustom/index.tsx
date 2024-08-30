import React from "react";
import { Pagination, PaginationProps } from "antd";
import "./style.scss";

type Props = {
  page: number;
  pageSize: number;
  total: number;
};

const PaginationCustom: React.FC<Props & PaginationProps> = ({
  page,
  pageSize,
  total,
  ...rest
}) => {
  return (
    <Pagination
      className="pagination-custom"
      {...rest}
      defaultCurrent={page}
      current={page}
      pageSize={pageSize}
      total={total}
      showSizeChanger={false}
    />
  );
};

export default PaginationCustom;
