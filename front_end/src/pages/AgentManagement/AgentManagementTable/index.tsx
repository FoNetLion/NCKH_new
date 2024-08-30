import { Card, Switch, Tooltip, Typography } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";

import "./style.scss";
import { IpType } from "../../../constants/types/rules.type";
import ListButtonActionUpdate from "../../../components/ListButtonActionUpdate";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import { dataMock } from "./mockData.config";
import CardTitleCustom from "../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
//import { USER_MANAGEMENT_DETAILS } from "../../../routes/route.constant";
import { usePhantrang } from "../../../utils/request";
import { Ipfilter } from "../../../constants/types/common.type";

const AgentManagementTable: FC = () => {
  const navigate = useNavigate();
  /* =========== SAU NAY LIST DANH SACH IP PHAN TRANG O DAY==============
  const [params, setParams] = useState<CommonGetAllParams>({
    limit: 10,
    page: 1,
  });
  const {data, mutate,isLoading} = usePhantrang(params);
*/
/*================ DU LIEU MAU, backend tra ve dang nay=============*/
const [params, setParams] = useState<CommonGetAllParams>({
  limit: 10,
  page: 1,
});
const isLoading = false
const Danhsachip = {
  "data": 
  [
  {'ip':'192.168.190.10','id':1},
  {'ip':'192.168.190.11','id':2},
  {'ip':'192.168.190.12','id':3}
                          ],
      "limit": 5,
      "page": 1,
      "total": 5
    }
  
  //=================== KET THUC DU LIEU MAU===================
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
  // const dataTable = dataMock.data
  //   ? dataMock.data.map((item: any) => {
  //     return {
  //       ...item,
  //       key: item.id,
  //     };
  //   })
  //   : [];
  const columns: ColumnsType<any> = [
    {
      key: 1,
      title: "Số Thứ Tự",
      align: "center",
      width: "10%",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      key: 2,
      title: "Địa Chỉ IP  ",
      dataIndex: "ip",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Trạng Thái Theo Dõi",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <>
      <Switch defaultValue={true}/>
        </>
      ),
    },
    {
      key: 4,
      title: "Thông Tin Chi Tiết",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <>
          <ListButtonActionUpdate
            // editFunction={() => {}}
            viewFunction={() => navigate(`/agent-management-details/${record.id}`)}
          />
          
        </>
      ),
    }

  ];
 

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="Danh Sách Các Máy Theo Dõi"/>
        <TableCustom
          dataSource={Danhsachip?.data}
          columns={columns}
          bordered={true}
          //isLoading={!data && isLoading}
          isLoading={isLoading}
          limit={Danhsachip.limit || 10}
          total={Danhsachip?.total}
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

export default AgentManagementTable;
