import { lazy } from "react";
import { AGENT_MANAGEMENT_DETAILS } from "../../routes/route.constant";
const agentManagementDetails = lazy(() => import("../AgentManagementDetails"));

export default {
  path: AGENT_MANAGEMENT_DETAILS,
  element: agentManagementDetails,
};
