import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store/store";
import { App as AntdApp } from "antd";
import "./app.css";
import AppProvider from "./context/AppProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AntdApp>
          <AppProvider>
            <App />
          </AppProvider>
        </AntdApp>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
