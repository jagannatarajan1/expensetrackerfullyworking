import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reduxstore from "./components/store/redux/reduxstore";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reduxstore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
