import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { accountApi } from "../../../apis/account";

interface accountDetailState {
    selectedAccount: object
}
export const fetchAsyncAccDetail = createAsyncThunk('accountDetail/fetchAccDetail',
    async (username: string) => {
        const response = await accountApi.getDetail({ username: username });
        return response.data;
    }
)

const initialState: accountDetailState = {
    selectedAccount: {}
}
const accountDetailSlice = createSlice({
    name: 'accountDetail',
    initialState,
    reducers: {
        removeSelectedAccount: (state) => {
            state.selectedAccount = {};
        },
    },
    extraReducers: {
        [fetchAsyncAccDetail.fulfilled.toString()]: (state, { payload }) => {
            return { ...state, selectedAccount: payload }
        },
    }
})

export const { removeSelectedAccount } = accountDetailSlice.actions;
export const getAccountDetail = (state: any) => state.AccountDetailSlice.selectedAccount;
export default accountDetailSlice.reducer;