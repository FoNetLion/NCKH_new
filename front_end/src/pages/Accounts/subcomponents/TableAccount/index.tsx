import React, { useEffect, useMemo } from "react";
import "./style.scss";
import { Space, Table, Typography, Pagination, Select, Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";
import StatusButton from "../StatusButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configs/configureStore";
import { getAllAccount } from "../../store/accountSlice";
import type { PaginationProps } from "antd";
import { useFormik } from "formik";
import { formatDate } from "../../../../utils/date";

const TableAccount = () => {
  const accountsState = useSelector((state: RootState) => state.accountSlice);

  const formFilter = useFormik({
    initialValues: {
      limit: accountsState.limit,
      page: accountsState.page,
    },
    onSubmit: (data: any) => {
      const params: any = {
        limit: data.limit,
        page: data.page,
      };
      dispatch(getAllAccount(params));
    },
  });

  const changePage: PaginationProps["onChange"] = (page) => {
    const params: any = {
      ...formFilter.values,
      page: page,
    };
    formFilter.setFieldValue("page", page);
    dispatch(getAllAccount(params));
  };

  const changePageSize = (limit: number) => {
    const params: any = {
      ...formFilter.values,
      limit: limit,
    };
    formFilter.setFieldValue("limit", limit);
    dispatch(getAllAccount(params));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const params: any = {
      page: accountsState.page,
      limit: accountsState.limit,
    };
    dispatch(getAllAccount(params));
  }, []);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "accountId",
        width: "8%",
      },
      {
        title: "Tên tài khoản",
        dataIndex: "username",
        sorter: true,
        render: (_, item) => (
          <>
            <Space>
              <Typography className="account-name">{item.username}</Typography>
            </Space>
          </>
        ),
      },
      {
        title: "Ngày tạo",
        dataIndex: "dateCreate",
        render: (dateCreate) => {
          if(dateCreate){
            return <>{formatDate(dateCreate)}</>
          }
        },
      },
      {
        title: "Tên khách hàng",
        dataIndex: "ownerName",
      },
      {
        title: "Đơn vị làm việc",
        dataIndex: "workingUnit",
      },
      {
        title: "Quyền",
        dataIndex: "role",
      },
      {
        title: "Status",
        dataIndex: "status",
        width: "10%",
        sorter: true,
        render: (_, item) => (
          <StatusButton data={item} to={`/account/${item.username}`} detail />
        ),
      },
    ],
    []
  );
  return (
    <div className="table-accounts">
      <Table
        size="small"
        bordered={false}
        columns={columns}
        dataSource={accountsState.accounts}
        pagination={{
          current: accountsState.page,
          pageSize: accountsState.limit,
          showSizeChanger: true,
          className: "table-pagination_buildIn",
        }}
        loading={accountsState.isLoadingGetAllAccount}
      />
      <Row justify={"space-between"} className="pagination-wapper">
        <Select
          value={accountsState.limit}
          defaultValue={accountsState.limit}
          style={{ width: 120 }}
          options={[
            { value: 5, label: "5 items" },
            { value: 10, label: "10 items" },
            { value: 15, label: "15 items" },
          ]}
          onChange={changePageSize}
        />
        <Pagination
          defaultCurrent={accountsState.page}
          current={accountsState.page}
          pageSize={accountsState.limit}
          total={accountsState.total}
          onChange={changePage}
        />
      </Row>
    </div>
  );
};

export default TableAccount;
