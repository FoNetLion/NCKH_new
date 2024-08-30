import {
  Space,
  Form,
  Input,
  CollapseProps,
  Collapse,
  Typography,
} from "antd";
import "./style.scss";
import React, { useEffect, useState } from "react";
import { FilterLogsType } from "../../../../../constants/types/userManagement.type";
import ButtonCustom from "../../../../../components/ButtonCustom";
import { DownOutlined } from "@ant-design/icons";

type Props = {
  filters: FilterLogsType;
  setFilters: (filters: FilterLogsType) => void;
};


const LogsFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const [filterData, setFilterData] = useState<FilterLogsType>({});

  useEffect(() => {
    if (filters) {
      setFilterData({ ...filterData, ...filters })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const items: CollapseProps["items"] = [
    {
      key: '1',
      label: "Filter",
      children: (
        <Form className="agentManager-FilterForm" layout="horizontal">
          <Space direction="horizontal" style={{ width: '100%' }}>
            <Form.Item label="IP source">
              <Input placeholder="IP source ..." />
            </Form.Item>
            <Form.Item label="IP des">
              <Input placeholder="IP des ..." />
            </Form.Item>
          </Space>
          <ButtonCustom
            label="Search"
            bgColor="#2862AF"
            type="primary"
            onClick={() => setFilters({ ...filterData })}
          />
        </Form>
      )

    }
  ]

  return (
    <>
      <Collapse
        expandIcon={({ isActive }) => (
          <Space>
            <Typography style={{ color: "#2862af" }}>
              {isActive ? "Hide filter" : "Show filter"}
            </Typography>
            <DownOutlined
              rotate={isActive ? 180 : 0}
              style={{ color: "#2862af" }}
            />
          </Space>
        )}
        items={items}
        expandIconPosition="end"
        bordered={false}
        className="filterLogs-collapse"
      />
    </>
  );
};

export default LogsFilter;
