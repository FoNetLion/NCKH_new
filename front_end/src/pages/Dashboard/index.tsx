import React, { useEffect } from "react";
import DashboardChart from "./component/DashboardChart";
import './style.scss'
import { useDispatch } from "react-redux";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import DashboardGeneralItem from "./component/DashboardGeneralItem";
import { Space, message } from "antd";
import Icons from "../../assets/icons";
import DboardTopCardItem from "./component/DboardTopCardItem";
import { usePhantrang, useStaticService } from "../../utils/request";


const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
      {
        label: "Dashboard",
        path: "",
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  }, [])

  /*============== Phan trang
  const params = {
    page:2
  }
  const {data, mutate} = usePhantrang(params);
 console.log(data?.limit);
 console.log(data?.data)
 ===========================
 */
  
  return (
    <div className="customers-wrapper">
      {/* <Space direction="horizontal" className="dasboard-gn-wrapper">
        <DashboardGeneralItem title="Số service" value={4} icon={<Icons.bell />} />
      </Space> */}

      {/* ve bieu do cot o day va duong o day */}
      <DashboardChart />

      {/* <Space direction="horizontal" className="dasboard-gn-wrapper" style={{marginTop: 10}}>
          <DboardTopCardItem title="Top vulnerabilities" value={['XSS', 'SQL Injection', 'File Upload']} icon={<Icons.file />}/>
          <DboardTopCardItem title="Top rules" value={['100201', '192020', '192829']} icon={<Icons.camera />}/>
      </Space> */}
    </div>
  );
};

export default Dashboard;
