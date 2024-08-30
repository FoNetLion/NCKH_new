import { lazy } from "react";
import { ACCOUNTDETAIL } from "../../routes/route.constant";
const accountDetail = lazy(() => import("../AccountDetail"));

export default {
  path: ACCOUNTDETAIL,
  element: accountDetail,
};
