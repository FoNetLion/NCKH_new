import { lazy } from "react";
import { LOG_PACKAGE  } from "../../routes/route.constant";
const log_package = lazy(() => import("."));

export default {
  path: LOG_PACKAGE ,
  element: log_package ,
};
