import { lazy } from "react";
import { ADD_FILE } from "../../routes/route.constant";
const addfilerule = lazy(() => import("../AddFileRule"));

export default {
  path: ADD_FILE ,
  element: addfilerule,
};
