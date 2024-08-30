import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../configs/rootSaga";
import appSlice from "../pages/App/store/appSlice";
import AccountDetailSlice from "../pages/AccountDetail/store/AccountDetailSlice";
import accountSlice from "../pages/Accounts/store/accountSlice";
import keySlice from "../pages/Keys/store/keySlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    appSlice,
    AccountDetailSlice,
    accountSlice,
    keySlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
