import { lazy } from "react";
import { RULE_MANAGEMENT} from "../../routes/route.constant";
const rulemanagement = lazy(() => import("../RuleManagement"));

export default {
  path: RULE_MANAGEMENT,
  element: rulemanagement ,
};
