import React, { useState } from "react";
import "./style.scss";
import LogsTable from "./LogsTable";
import LogsFilter from "./LogsFilter";
import { useParams } from "react-router-dom";
import FLowManagementTable from "../../../FlowManagement/FLowManagementTable";
import FLowManagementFilter from "../../../FlowManagement/FlowmanagementFilter";
const Logs = () => {
  let { id } = useParams();
  const [filter, setFilter]= useState<any>({})
  const [isopenKeyCreateModal, setIsOpenKeyCreateModal] =
    useState<boolean>(false);

  const openKeyCreateModal = () => {
    setIsOpenKeyCreateModal(true);
  };

  const closeKeyCreateModal = () => {
    setIsOpenKeyCreateModal(false);
  };


  return (
    <>
      {/* <div style={{ marginBottom: '12px' }}>
        <LogsFilter filters={filter} setFilters={setFilter}/>
      </div>
      <LogsTable id = {id} /> */}
        <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <FLowManagementFilter filters={filter} setFilters={setFilter}/>
      </div>
       <FLowManagementTable filters={filter} setFilters={setFilter}/>
    </div>
    </>
  );
};

export default Logs;
