import React, { useEffect, useState } from "react";
import "./style.scss";
import FLowManagementTable from "./FLowManagementTable";
import { useDispatch } from "react-redux";
import { FLOW_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import FLowManagementFilter from "./FlowmanagementFilter";

const FlowManagement = () => {
  const [filter, setFilter]= useState<any>({})
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
       {
        label: "FLow management",
        path: ""
       }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  },[FLOW_MANAGEMENT])
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <FLowManagementFilter filters={filter} setFilters={setFilter}/>
      </div>
       <FLowManagementTable filters={filter} setFilters={setFilter}/>
    </div>
  );
};

export default FlowManagement;
