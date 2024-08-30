import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Key } from "../../../constants/types/key.type";
import { GetAllKeysSuccessPayload } from "./store.type";
import { CommonGetAllParams, CommonSearchAllParams } from "../../../constants/types/common.type";

type KeyState = {
    keys: Array<Key>;
    page: number;
    limit: number;
    total: number;
    status: number;
    isLoadingGetAllKey: boolean;
}

const initialState: KeyState = {
    keys: [],
    page: 1,
    limit: 10,
    status: -1,
    total: 0,
    isLoadingGetAllKey: false,
}

export const keySlice = createSlice({
    name: 'key',
    initialState,
    reducers:{
        getAllKey: (state, action?: PayloadAction<CommonGetAllParams>)=>{
            state.isLoadingGetAllKey=true;
        },
        searchKey: (state, action?: PayloadAction<CommonSearchAllParams>)=>{
            state.isLoadingGetAllKey=true;
        },
        getAllKeySuccess: (state, action: PayloadAction<GetAllKeysSuccessPayload>)=>{
            state.keys = action.payload.keys;
            state.limit = action.payload.limit;
            state.page = action.payload.page;
            state.total = action.payload.total;
            state.isLoadingGetAllKey = false;
        },
        getAllKeyFailed: (state)=>{
            state.isLoadingGetAllKey = false;
        }
    }
})

export const {getAllKey, getAllKeySuccess, getAllKeyFailed, searchKey} = keySlice.actions;

export default keySlice.reducer;