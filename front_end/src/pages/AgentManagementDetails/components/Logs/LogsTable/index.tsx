import { Card, Tooltip, Typography } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";

import "./style.scss";
import { dataMock } from "./mockData.config";
import dayjs from "dayjs";
import { CommonGetAllParams } from "../../../../../constants/types/common.type";
import { IpType } from "../../../../../constants/types/rules.type";
import CardTitleCustom from "../../../../../components/CardTitleCustom";
import TableCustom from "../../../../../components/TableCustom";
type Props = {
  id?:string;
}
const LogsTable: FC<Props> = ({id}) => {
  //=========== lay ra id cua ip
  console.log(id);
  const [params, setParams] = useState<CommonGetAllParams>({
    limit: 10,
    page: 1,
  });
  const [isEditSystemParamsModalShow, SetIsEditSystemParamsModalShow] =
    useState(false);
  const [selectedRule, setSelectedRule] = useState<any>({});
  const closeEditSystemParamsModal = () => {
    SetIsEditSystemParamsModalShow(false);
  };
  const openEditSystemParamsModal = (record: any) => {
    SetIsEditSystemParamsModalShow(true);
    setSelectedRule(record);
  };
  // const { data, isLoading, error, mutate } = useSystemParams(params, filter);
  const dataTable = dataMock.data
    ? dataMock.data.map((item: any) => {
      return {
        ...item,
        key: item.id,
      };
    })
    : [];

  const columns: ColumnsType<IpType> = [
    {
      key: 2,
      title: "Time",
      dataIndex: "time",
      align: "left",
      width: "15%",
      render: (time) => (
        <Tooltip title={time}>
          <div className="inline-text">{dayjs(time).format('ddd MMM D YYYY HH:mm:ss')}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Ip src",
      dataIndex: "ipSrc",
      align: "left",
      width: "15%",
      render: (ipSrc) => (
        <Tooltip title={ipSrc}>
          <div className="inline-text">{ipSrc}</div>
        </Tooltip>
      ),
    },
    {
      key: 4,
      title: "Ip dest",
      dataIndex: "ipDest",
      align: "left",
      width: "15%",
      render: (ipDest) => (
        <Tooltip title={ipDest}>
          <div className="inline-text">{ipDest}</div>
        </Tooltip>
      ),
    },
    {
      key: 5,
      title: "Message",
      dataIndex: "msg",
      align: "left",
      render: (msg) => (
        <Tooltip title={msg}>
          <div className="inline-text">{msg}</div>
        </Tooltip>
      ),
    },
    {
      key: 5,
      title: "Details",
      dataIndex: "details",
      align: "left",
      render: (details) => (
        <Tooltip title={details}>
          <div className="inline-text">{details}</div>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="List logs" />
        <TableCustom
          dataSource={dataTable}
          columns={columns}
          bordered={true}
          //isLoading={!data && isLoading}
          isLoading={false}
          limit={params.limit || 10}
          total={dataMock ? dataMock.total : 0}
          onLimitChange={(limit) => {
            setParams({ ...params, limit });
          }}
          onPageChange={(page) => {
            setParams({ ...params, page });
          }}
          page={params.page || 1}
        />
      </Card>
    </div>
  );
};

export default LogsTable;
