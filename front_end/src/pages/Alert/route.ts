import { lazy } from "react";
import { ALERT } from "../../routes/route.constant";
const alert = lazy(() => import("../Alert"));

export default {
  path: ALERT,
  element: alert,
};
