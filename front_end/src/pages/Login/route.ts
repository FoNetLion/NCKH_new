import { lazy } from "react";
import { LOGIN } from "../../routes/route.constant";
const Login = lazy(() => import("../Login"));

export default {
  path: LOGIN,
  element: Login,
};
