import { keyApi } from "../../../apis/key";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetAllKeysSuccessPayload } from "./store.type";
import { getAllKeySuccess, getAllKeyFailed, getAllKey, searchKey } from "./keySlice";
import { PayloadAction } from '@reduxjs/toolkit';
import { CommonGetAllParams, CommonSearchAllParams } from "../../../constants/types/common.type";
import { message } from "antd";

function* getAllKeySaga(action: PayloadAction<CommonGetAllParams>): unknown{
    try{
        const response = yield call(keyApi.getAll, action.payload);
        const payload: GetAllKeysSuccessPayload = {
            keys: response.data.data,
            page: response.data.page,
            limit: response.data.limit,
            total: response.data.total,
        }

        yield put(
           { type: getAllKeySuccess.type,
            payload,}
        )
    }
    catch(error){
        message.error('Lỗi khi lấy danh sách key!')
        yield put({type: getAllKeyFailed.type})
    }
};

function* searchKeySaga(action: PayloadAction<CommonSearchAllParams>): unknown{
    try{
        const response = yield call(keyApi.search, action.payload);
        const payload: GetAllKeysSuccessPayload = {
            keys: response.data.data,
            page: response.data.page,
            limit: response.data.limit,
            total: response.data.total,
        }

        yield put(
           { type: getAllKeySuccess.type,
            payload,}
        )
    }
    catch(error){
        message.error('Lỗi khi lấy danh sách key!')
        yield put({type: getAllKeyFailed.type})
    }
};

function* mySaga(){
    yield takeLatest(
        getAllKey.type,
        getAllKeySaga
    );
    yield takeLatest(
        searchKey.type,
        searchKeySaga,
    )
}

export default mySaga;






