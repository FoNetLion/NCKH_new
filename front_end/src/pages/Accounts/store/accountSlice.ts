import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../../constants/types/common.type";
import { GetAllAccountsSuccessPayload } from "./store.type";
import { CommonGetAllParams, CommonSearchAllParams } from "../../../constants/types/common.type";

type AccountState = {
    accounts: Array<Account>;
    page: number;
    limit: number;
    total: number;
    status: number;
    isLoadingGetAllAccount: boolean;
}

const initialState: AccountState = {
    accounts: [],
    page: 1,
    status: -1,
    limit: 10,
    total: 0,
    isLoadingGetAllAccount: false,
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers:{
        getAllAccount: (state,action?: PayloadAction<CommonGetAllParams>)=>{
            state.isLoadingGetAllAccount=true;

        },
        searchAccount: (state, action?: PayloadAction<CommonSearchAllParams>) =>{
            state.isLoadingGetAllAccount=true;
        },
        getAllAccountSuccess: (state, action: PayloadAction<GetAllAccountsSuccessPayload>)=>{
            state.accounts = action.payload.accounts;
            state.limit = action.payload.limit;
            state.page = action.payload.page;
            state.total = action.payload.total;
            state.isLoadingGetAllAccount = false;
        },
        getAllAccountFailed: (state, action: PayloadAction<string>)=>{
            state.isLoadingGetAllAccount = false;
        }
    }
})

export const {getAllAccount, getAllAccountSuccess, getAllAccountFailed, searchAccount} = accountSlice.actions;

export default accountSlice.reducer;