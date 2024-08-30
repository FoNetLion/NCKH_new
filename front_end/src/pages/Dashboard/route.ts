import { lazy } from "react";
import { DASHBOARD } from "../../routes/route.constant";
const dashboard = lazy(() => import("../Dashboard"));

export default {
  path: DASHBOARD,
  element: dashboard,
};
