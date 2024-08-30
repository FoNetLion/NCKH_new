import { Card, Tooltip, message } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";
import "./style.scss";
import ListButtonActionUpdate from "../../../components/ListButtonActionUpdate";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import CardTitleCustom from "../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
import { Filenamefilter} from "../../../constants/types/common.type";
import { RuleApi } from "../../../apis/rule";
import { useListFileRule } from "../../../utils/request";


type Props = {
  filter: Filenamefilter;
  setFilter: (filter: Filenamefilter) => void;
};
const ListFileRuleTable: FC<Props> = ({ filter }) => {
  const navigate = useNavigate();
  const [params, setParams] = useState<CommonGetAllParams>({
    limit: 10,
    page: 1,
  });
  //================= API==============================,  // isLoading={!data && isLoading}
  const { data, isLoading, error, mutate } = useListFileRule(params);
  //============== dữ liệu mẫu
  /*
  const data = {
    "data": [
      {
        "filename": "manh1.yaml",
        "creation_date": 1,
      },
      {
        "filename": "manh2.yaml",
        "creation_date": 2,
      },
      {
        "filename": "manh3.yaml",
        "creation_date": 3,
      },
      {
        "filename": "manh4.yaml",
        "creation_date": 4,
      },
      {
        "filename": "manh5.yaml",
        "creation_date": 5,
      },
      {
        "filename": "manh6.yaml",
        "creation_date": 6,
      },
      {
        "filename": "manh7.yaml",
        "creation_date": 7,
      },
      {
        "filename": "manh8.yaml",
        "creation_date": 8,
      }
    ],
    "limit": 10,
    "page": 1,
    "total": 8
  }
    */

  const removeRuleFileHandler = async (filename?: string) => {
   
    try {
      const res = await RuleApi.DeleteFileRule({filename});
      if (res.status === 200) {
        message.success("Xóa file thành công");
        mutate();
      }
      else message.error("Xóa file thất bại");
    } catch (error) {
      message.error("Xóa file thất bại");
    }
  }


  const columns: ColumnsType<any> = [
    {
      key: 1,
      title: "Số Thứ Tự",
      align: "center",
      width: "5%",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      key: 2,
      title: "File name",
      dataIndex: "filename",
      align: "center",
      render: (filename) => (
        <Tooltip title={filename}>
          <div className="inline-text">{filename}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Ngày tạo",
      dataIndex: "creation_date",
      align: "center",
      render: (creation_date) => (
        <Tooltip title={creation_date}>
          <div className="inline-text">{creation_date}</div>
        </Tooltip>
      ),
    },
    {
      key: 9,
      title: "Action",
      align: "center",
      width: "10%",
      render: (_, record: any) => (
        <>
          <ListButtonActionUpdate
          // khi nhấn vào nút edit thì chuyển qua đường dẫn url mới, đồng thời ta lấy tên file và bỏ đi đuôi .yaml để hiện lên đường 
          // dẫn url
            editFunction={() => navigate(`/rule-details/${record.filename}`)}
            removeFunction={() => removeRuleFileHandler(record.filename)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="Danh Sách File Rule" />
        <TableCustom
          dataSource={data?.data}
          columns={columns}
          bordered={true}
          isLoading={!data && isLoading}
          limit={params.limit || 10}
          total={data ? data.total : 0}
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

export default ListFileRuleTable;
