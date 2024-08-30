import { Card, Tooltip, Typography } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";

import "./style.scss";
import { FlowType} from "../../../constants/types/rules.type";
import ListButtonActionUpdate from "../../../components/ListButtonActionUpdate";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import { dataMock } from "./mockData.config";
import CardTitleCustom from "../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
//import { FLOW_MANAGEMENT_DETAILS } from "../../../routes/route.constant";
import { usePhantrang } from "../../../utils/request";
import { Flowfilter } from "../../../constants/types/common.type";
import { type } from "os";

type Props = {
  filters: Flowfilter;
  setFilters: (filters: Flowfilter) => void;
};

const FLowManagementTable: FC<Props> = ({setFilters, filters}) => {
  const navigate = useNavigate();
  const [params, setParams] = useState<CommonGetAllParams>({
    limit: 10,
    page: 1,
  });
  const {data, mutate,isLoading} = usePhantrang(params, filters);

  console.log(filters);
  
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
  const predictionColors: { [key: string]: string } = {
    'DoS slowloris': '#DC143C', // Màu đỏ cho DDoS
    PortScan: '#1703fc', 
    'Bruce Force' : '#FF7433', 
    'Unknown attack':'#00489a' ,
    'BENIGN' :'green' 
  };
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
      title: "Source IP",
      dataIndex: "Source IP",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Source Port",
      dataIndex: "Source Port",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 4,
      title: "Destination IP",
      dataIndex: "Destination IP",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 5,
      title: "Destination Port",
      dataIndex: "Destination Port",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 6,
      title: "Protocol",
      dataIndex: "Protocol",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 7,
      title: "Timestamp",
      dataIndex: "Timestamp",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    {
      key: 8,
      title: "Dự Đoán",
      dataIndex: "label",
      align: "center",
      render: (group: string) => {
        const color = predictionColors[group] || ''; // Lấy màu sắc tương ứng từ bảng mã màu
        return (
          <Tooltip title={group}>
            <div className={`inline-text ${color ? 'prediction-column' : ''}`} style={{ backgroundColor: color,color: 'white',fontWeight: 'bold' }}>{group}</div>
          </Tooltip>
        );
      },
    }
    // {
    //   key: 9,
    //   title: "Action",
    //   align: "center",
    //   width: "10%",
    //   render: (_, record) => (
    //     <>
    //       <ListButtonActionUpdate
    //         editFunction={() => {}}
    //         viewFunction={() => navigate(`/user-management-details/${123}`)}
    //       />
    //     </>
    //   ),
    // },
  ];
 

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="Danh Sách FLow"/>
        <TableCustom
          dataSource={data?.data}
          columns={columns}
          bordered={true}
          //isLoading={!data && isLoading}
          isLoading={isLoading}
          limit={params.limit || 10}
          total={data?.total}
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

export default FLowManagementTable;
