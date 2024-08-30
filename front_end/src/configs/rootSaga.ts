import { all } from "redux-saga/effects";
// import appSaga from "pages/App/store/appSaga";
import accountSaga from '../pages/Accounts/store/accountSaga'
import keySaga from "../pages/Keys/store/keySaga";

export default function* rootSaga() {
  yield all([keySaga(),accountSaga()]);
}
