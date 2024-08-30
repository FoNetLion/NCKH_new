import { lazy } from "react";
import { FLOW_MANAGEMENT } from "../../routes/route.constant";
const flowManagement = lazy(() => import("../FlowManagement"));

export default {
  path: FLOW_MANAGEMENT,
  element: flowManagement,
};
