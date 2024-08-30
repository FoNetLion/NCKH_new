import React, { useEffect } from "react";
import DashboardChart from "./component/DashboardChart";
import './style.scss'
import { useDispatch } from "react-redux";
import { Space } from "antd";
import Icons from "../../../../assets/icons";
import DashboardGeneralItem from "../../../Dashboard/component/DashboardGeneralItem";
import DboardTopCardItem from "../../../Dashboard/component/DboardTopCardItem";
import { useParams } from "react-router-dom";

const AgentMnDashboard = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  return (
    <div className="customers-wrapper">
      <Space direction="horizontal" className="dasboard-gn-wrapper">
        {/* <DashboardGeneralItem title="Number of services" value={4} icon={<Icons.bell />} />
        <DashboardGeneralItem title="Number of accesses" value={50} icon={<Icons.bell />} />
        <DashboardGeneralItem title="Number of prevent IP" value={10} icon={<Icons.bell />} /> */}
      </Space>
      <DashboardChart id = {id} />
      {/* <Space direction="horizontal" className="dasboard-gn-wrapper" style={{marginTop: 10}}>
          <DboardTopCardItem title="Top vulnerabilities" value={['XSS', 'SQL Injection', 'File Upload']} icon={<Icons.file />}/>
          <DboardTopCardItem title="Top rules" value={['100201', '192020', '192829']} icon={<Icons.camera />}/>
      </Space> */}
    </div>
  );
};

export default AgentMnDashboard;
