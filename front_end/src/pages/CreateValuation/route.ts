import { lazy } from "react";
import { CREATEVALUATION } from "../../routes/route.constant";
const createValidation = lazy(() => import("../CreateValuation"));

export default {
  path: CREATEVALUATION,
  element: createValidation,
};
