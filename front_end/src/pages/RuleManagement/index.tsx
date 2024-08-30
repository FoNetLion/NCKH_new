import React, { useEffect, useState } from "react";
import "./style.scss";
import ListFileRuleTable from "./ListFileRuleTable";
import RuleManagementFilter from "./RuleManagementFilter";

const RuleManagement = () => {
  const [filter, setFilter]= useState<any>({})    
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <RuleManagementFilter filters={filter} setFilters={setFilter}/>
      </div>
       <ListFileRuleTable filter={filter} setFilter={setFilter}/>
       
    </div>
  );
};

export default RuleManagement;
