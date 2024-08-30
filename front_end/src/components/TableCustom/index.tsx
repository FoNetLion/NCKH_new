import "./style.scss";
import { Row, Table, TableProps } from "antd";
import { ColumnType } from "antd/es/table";
import React, { useState } from "react";
import "./style.scss";
import SelectCustom from "../SelectCustom";
import PaginationCustom from "../PaginationCustom";

type Props = {
  dataSource: Array<any>;
  columns: Array<ColumnType<any>>;
  isLoading: boolean;
  page: number;
  total: number;
  limit: number;
  bordered: boolean;
  paginationConditional?: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  isRowSelection?: boolean;
};

const TableCustom: React.FC<Props & TableProps<any>> = ({
  dataSource,
  columns,
  page,
  limit,
  bordered,
  total,
  isLoading,
  onLimitChange,
  onPageChange,
  paginationConditional = true,
  isRowSelection = false,
  ...rest
}) => {
  const [selectedRows, setSelectedRows] = useState<React.Key[]>([]);

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    rowSelected: any[]
  ) => {
    const ids = rowSelected.map((row) => row.assetId);
    setSelectedRows(ids);
    localStorage.setItem(
      "PRICESHARED_COLLECTED",
      ids.toString()
    );
  };

  const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
  };

  return (
    <>
      <div style={{ marginBottom: "4px", width: "100%" }}>
        <Table
          {...rest}
          size="small"
          className="table-custom"
          dataSource={dataSource}
          columns={columns}
          bordered={bordered}
          loading={isLoading}
          pagination={{ pageSize: limit || 10 }}
          rowSelection={isRowSelection ? rowSelection : undefined}
        />
      </div>
      {!total ? null : (
        <Row justify={"space-between"}>
          {paginationConditional && (
            <>
              <SelectCustom
                value={limit}
                placeholder="choose number of line"
                size="small"
                onChange={(value:any) => {
                  onLimitChange(value);
                  localStorage.setItem("PAGE_SIZE", value);
                }}
                options={[
                  {
                    value: 5,
                    label: "5 line",
                  },
                  {
                    value: 10,
                    label: "10 line",
                  },
                  {
                    value: 15,
                    label: "15 line",
                  },
                  {
                    value: 25,
                    label: "25 line",
                  },
                  {
                    value: 50,
                    label: "50 line",
                  },
                ]}
                allowClear={false}
              />
              <PaginationCustom
                page={page || 1}
                pageSize={limit || 10}
                total={total || 0}
                onChange={(value:any) => {
                  onPageChange(value);
                }}
              />
            </>
          )}
        </Row>
      )}
    </>
  );
};

export default TableCustom;
