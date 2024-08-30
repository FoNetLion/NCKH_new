import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Page {
  path: string;
  label: string;
}
interface AppState {
  isLogged: boolean;
  account: object;
  logging: boolean;
  activeTab: string;
  breadCrumb: Array<Page>,
}

const initialState: AppState = {
  activeTab: "custom",
  logging: false,
  isLogged: false,
  account: {},
  breadCrumb: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action) => {
      state.logging = false;
      state.isLogged = true;
      state.account = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.account = {};
      state.logging = false;
    },
    changeActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedBreadCrumb: (state, action: PayloadAction<Array<Page>>) => {
      state.breadCrumb = action.payload;
    }
  },
});

export const {
  login,
  logout,
  changeActiveTab,
  setSelectedBreadCrumb
} = appSlice.actions;
export const getAccountLoggedIn = (state: any) => state.appSlice.account
export const getIsLoggedIn = (state: any) => state.appSlice.isLogged
export default appSlice.reducer;
