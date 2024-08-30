import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./configs/configureStore";
import { Provider } from "react-redux";
import { NCKHAxiosClient } from "./apis/base";
import {SWRConfig} from 'swr';
import { error } from "console";
const fetcher = (url:string) => NCKHAxiosClient(url).then(res=>res.data)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <SWRConfig
      value={{
        fetcher,
        onErrorRetry:(error,key,config,revalidate,{retryCount}) =>{
          if(error.status === 404) return;
          if(error.status === 403) return;
          if(retryCount >= 0) return;
          setTimeout(() => revalidate({retryCount}), 5000);
        },
        refreshInterval:5000
      }}
      >
        <App />
      </SWRConfig>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
