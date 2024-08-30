import { lazy } from "react";
import { RULE_DETAILS  } from "../../routes/route.constant";
const ruledetails = lazy(() => import("../RuleDetail"));

export default {
  path: RULE_DETAILS ,
  element: ruledetails,
};
