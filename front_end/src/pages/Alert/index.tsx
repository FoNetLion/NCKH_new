import React, { useEffect, useState } from "react";
import "./style.scss";
import AlertTable from "./AlertTable";
import { useDispatch } from "react-redux";
import { ALERT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import AlertFilter from "./AlertFilter";

const Alert = () => {
  const [filter, setFilter]= useState<any>({})
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
       {
        label: "Alert",
        path: ""
       }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  },[ALERT]) 
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <AlertFilter filters={filter} setFilters={setFilter}/>
      </div>
       <AlertTable />
    </div>
  );
};

export default Alert;
