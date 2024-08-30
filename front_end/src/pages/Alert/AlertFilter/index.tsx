import {
  Button,
  Card,
  Row,
  Space,
  Typography,
  Form,
  Input,
  Select,
} from "antd";
import "./style.scss";
import React, { useEffect, useState } from "react";
import ButtonCustom from "../../../components/ButtonCustom";
import { Alertfilter } from "../../../constants/types/common.type";

type Props = {
  filters: Alertfilter;
  setFilters: (filters: Alertfilter) => void;
};


const AlertFilter: React.FC<Props> = ({ filters, setFilters }) => {
const [filterData, setFilterData] = useState<Alertfilter>({});

  useEffect(() => {
    if (filters) {
      setFilterData({ ...filterData, ...filters })
    }
  }, [filters]);

  return (
    <Form className="alert-FilterForm" layout="vertical">
      <Space direction="horizontal" style={{width: '100%'}}>

      {/* <Form.Item label="chọn thuộc tính">
          <Select value={filterData.filter_field} onChange={handleSelectChange} allowClear>
            <Select.Option value="Source IP">IP Nguồn</Select.Option>
            <Select.Option value="Source Port">Port Nguồn</Select.Option>
            <Select.Option value="Destination IP">IP Đích</Select.Option>
            <Select.Option value="Destination Port">Port Đích</Select.Option>
            <Select.Option value="label">Nhãn</Select.Option>
          </Select>

        </Form.Item>
        <Form.Item label="giá trị">

      <Input placeholder="Value ..." onChange={e => setFilterData({...filterData, filter_value: e.target.value})}/>
      </Form.Item>
      <ButtonCustom
          label="Search"
          bgColor="#2862AF"
          type="primary"
          onClick={() => setFilters({ ...filterData })}
        /> */}
      </Space>
    </Form>
    
  );
};

export default AlertFilter;
