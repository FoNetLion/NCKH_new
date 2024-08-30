import { lazy } from "react";
import { ACCOUNT } from "../../routes/route.constant";
const account = lazy(() => import("../Accounts"));

export default {
  path: ACCOUNT,
  element: account,
};
