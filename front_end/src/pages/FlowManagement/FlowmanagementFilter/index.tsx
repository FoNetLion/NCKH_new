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
import { Flowfilter } from "../../../constants/types/common.type";

type Props = {
  filters: Flowfilter;
  setFilters: (filters: Flowfilter) => void;
};


const FlowManagementFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const [filterData, setFilterData] = useState<Flowfilter>({});

  useEffect(() => {
    if (filters) {
      setFilterData({ ...filterData, ...filters })
    }
  }, [filters]);
  // Hàm xử lý sự kiện khi option thay đổi
  const handleSelectChange = (event: any) => {
    setFilterData({ ...filterData, filter_field: event }); // Cập nhật giá trị được chọn vào state
  }
  return (
    // <Form className="flowManager-FilterForm" layout="vertical" style={{marginLeft: '500px'}} > căn chỉnh ra giữa
    <Form className="flowManager-FilterForm" layout="vertical" >
      <Space direction="horizontal" style={{ width: '100%', alignItems: "center" }}>
        <Form.Item label="chọn thuộc tính" style={{ width: '150px' }}>
          <Select value={filterData.filter_field} onChange={handleSelectChange} allowClear>
            <Select.Option value="Source IP">Source IP</Select.Option>
            <Select.Option value="Source Port">Source Port</Select.Option>
            <Select.Option value="Destination IP">Destination IP</Select.Option>
            <Select.Option value="Destination Port">Destination Port</Select.Option>
            <Select.Option value="label">Dự Đoán</Select.Option>
          </Select>

        </Form.Item>

        <Form.Item label="giá trị">

          <Input placeholder="Value ..." onChange={e => setFilterData({...filterData, filter_value: e.target.value})}/>
        </Form.Item>
        {/* <Input placeholder="Source IP ..." /> */}
        <ButtonCustom
          label="Search"
          bgColor="#2862AF"
          type="primary"
          onClick={() => setFilters({ ...filterData })}
          style={{ width: '150px', height: '28px', fontSize: '14px' }}
        />
      </Space>
    </Form>

  );
};

export default FlowManagementFilter;
