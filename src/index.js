import React from "react";
import ReactDOM from "react-dom";
import "./components/styles/index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers/_rootReducer";

require("dotenv").config();

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
