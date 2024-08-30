import { Card, Tooltip, Typography } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";

import "./style.scss";
import { FlowType } from "../../../constants/types/rules.type";
import ListButtonActionUpdate from "../../../components/ListButtonActionUpdate";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import { dataMock } from "./mockData.config";
import CardTitleCustom from "../../../components/CardTitleCustom";


const RulesTable: FC = () => {
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
  const columns: ColumnsType<FlowType> = [
    {
      key: 1,
      title: "Index",
      align: "center",
      width: "10%",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      key: 2,
      title: "Rule",
      dataIndex: "content",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 5,
      title: "Action",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <>
          <ListButtonActionUpdate
            editFunction={() => openEditSystemParamsModal(record)}
            removeFunction={() => {}}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="List rules"/>
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

export default RulesTable;
