import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import week from "./reducers/weekReducer";
import season from "./reducers/seasonReducer";
import meta from "./reducers/metaReducer";
import theme from "./reducers/themeReducer";

const reducer = combineReducers({ week, season, meta, theme });

export const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
