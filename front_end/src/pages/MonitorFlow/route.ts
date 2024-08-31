import { lazy } from "react";
import { MONITOR_FLOW } from "../../routes/route.constant";
const monitorflow = lazy(() => import("../MonitorFlow"));

export default {
  path: MONITOR_FLOW,
  element: monitorflow,
};
