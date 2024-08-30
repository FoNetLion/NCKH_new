import { call, put, takeLatest } from "redux-saga/effects";
import { GetAllAccountsSuccessPayload } from "./store.type";
import {
  getAllAccount,
  getAllAccountSuccess,
  getAllAccountFailed,
  searchAccount,
} from "./accountSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  CommonGetAllParams,
  CommonSearchAllParams,
} from "../../../constants/types/common.type";
import { accountApi } from "../../../apis/account";
import { message } from "antd";

function* getAllAccountSaga(
  action: PayloadAction<CommonGetAllParams>
): unknown {
  try {
    const response = yield call(accountApi.getAccounts, action.payload);
    const payload: GetAllAccountsSuccessPayload = {
      accounts: response.data.data,
      page: response.data.page,
      limit: response.data.limit,
      total: response.data.total,
    };
    yield put({ type: getAllAccountSuccess.type, payload });
  } catch (error) {
    message.error("Lỗi khi lấy danh sách tài khoản!");
    yield put({ type: getAllAccountFailed.type });
  }
}

function* searchAccountSaga(
  action: PayloadAction<CommonSearchAllParams>
): unknown {
  try {
    const response = yield call(accountApi.search, action.payload);
    const payload: GetAllAccountsSuccessPayload = {
      accounts: response.data.data,
      page: response.data.page,
      limit: response.data.limit,
      total: response.data.total,
    };

    yield put({ type: getAllAccountSuccess.type, payload });
  } catch (error) {
    message.error("Lỗi khi lấy danh sách tài khoản!");
    yield put({ type: getAllAccountFailed.type });
  }
}

function* mySaga() {
  yield takeLatest(getAllAccount.type, getAllAccountSaga);
  yield takeLatest(searchAccount.type, searchAccountSaga);
}

export default mySaga;
