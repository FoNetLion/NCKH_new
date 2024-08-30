import { Card, Tooltip, Typography } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";

import "./style.scss";
import {AlertType} from "../../../constants/types/rules.type";
import ListButtonActionUpdate from "../../../components/ListButtonActionUpdate";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import { dataMock } from "./mockData.config";
import CardTitleCustom from "../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
//import { FLOW_MANAGEMENT_DETAILS } from "../../../routes/route.constant";
import { useAlert } from "../../../utils/request";
import {Alertfilter } from "../../../constants/types/common.type";


const AlertTable: FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<CommonGetAllParams>({
    limit: 10,
    page: 1,
  });
  const {data, mutate,isLoading} = useAlert(params);
  
  /*
  BruceForce  DDoS  UnknowAttack PortScan
  const Danhsachalert = {
    "data": [
      {
        "Source IP": "192.168.190.15",
        "Source Port": 33240,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:08:38",
        "Flow Duration": 130003,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 40974,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:09:11",
        "Flow Duration": 338916,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 41764,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:09:12",
        "Flow Duration": 11404,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 60508,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:09:44",
        "Flow Duration": 196447,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 35308,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:09:45",
        "Flow Duration": 488958,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 35786,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:09:46",
        "Flow Duration": 84728,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 36040,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:09:46",
        "Flow Duration": 150378,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 38340,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:08:55",
        "Flow Duration": 66999329,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 48058,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:10:17",
        "Flow Duration": 377915,
        "label": "UnknowAttack"
      },
      {
        "Source IP": "192.168.190.15",
        "Source Port": 48870,
        "Destination IP": "192.168.190.10",
        "Destination Port": 22,
        "Protocol": 6,
        "Timestamp": "2024-03-22 22:10:18",
        "Flow Duration": 52,
        "label": "UnknowAttack"
      }
    ],
    "limit": 15,
    "page": 1,
    "total": 629
  }
  */
  
  
  
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
      title: "Flow Duration",
      dataIndex: "Flow Duration",
      align: "center",
      render: (group) => (
        <Tooltip title={group}>
          <div className="inline-text">{group}</div>
        </Tooltip>
      ),
    },
    // {
    //   key: 9,
    //   title: "du doan",
    //   dataIndex: "label",
    //   align: "center",
    //   render: (group) => (
    //     <Tooltip title={group}>
    //       <div className="inline-text">{group}</div>
    //     </Tooltip>
    //   ),
    // }
    {
      key: 9,
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
    },
    // {
    //   key: 9,
    //   title: "Dự đoán",
    //   dataIndex: "label",
    //   align: "center",
    //   render: (group) => {
    //     const isDdos = group === "DDoS";
    //     return (
    //       <Tooltip title={group}>
    //         <div className={`inline-text ${isDdos ? 'ddos-column' : ''}`}>{group}</div>
    //       </Tooltip>
    //     );
    //   },
    // },
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
        <CardTitleCustom title="Cảnh Báo"/>
        <TableCustom
          dataSource={data?.data}
          columns={columns}
          bordered={true}
          //isLoading={!data && isLoading}
          isLoading={isLoading}
          limit={params.limit || 15 }
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

export default AlertTable;
