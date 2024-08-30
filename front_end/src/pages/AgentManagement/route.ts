import { lazy } from "react";
import { AGENT_MANAGEMENT } from "../../routes/route.constant";
const agentManagement = lazy(() => import("../AgentManagement"));

export default {
  path: AGENT_MANAGEMENT,
  element: agentManagement,
};
