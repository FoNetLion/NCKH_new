import React, { useEffect, useState } from "react";
import "./style.scss";
import AgentManagementTable from "./AgentManagementTable";
import { useDispatch } from "react-redux";
import { AGENT_MANAGEMENT} from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import AgentManagementFilter from "./AgentmanagementFilter";

const AgentManagement = () => {
  const [filter, setFilter]= useState<any>({})
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
       {
        label: "IP management",
        path: ""
       }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  },[AGENT_MANAGEMENT]) 
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <AgentManagementFilter filters={filter} setFilters={setFilter}/>
      </div>
       <AgentManagementTable />
    </div>
  );
};

export default AgentManagement;
