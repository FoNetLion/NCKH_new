import React, { useEffect, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import Rules from "../Keys";
import { useDispatch } from "react-redux";
import { AGENT_MANAGEMENT, AGENT_MANAGEMENT_DETAILS } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import Logs from "./components/Logs";
import AgentMnDashboard from "./components/AgentMnDashboard";

const AgentManagementDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
      {
        label: "agent managerment",
        path: AGENT_MANAGEMENT
      },
      {
        label: `${id}`,
        path: ""
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb));
  }, [AGENT_MANAGEMENT_DETAILS])
  console.log(id);
  const items = [{
    label: "Thống Kê",
    key: "Statistic",
    children: <AgentMnDashboard />,
  },
  {
    label: "Log",
    key: "Events",
    children: <Logs />,
  }
  // {
  //   label: "Rules",
  //   key: "ruleCustom",
  //   children: <Rules />,
  // }
]

  return (
    <div className="container-wrapper">
      <Tabs items={items} className="agentManagementDetailsTab"/>
    </div>
  );
};

export default AgentManagementDetail;
