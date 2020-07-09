import React from "react";
import ReactDOM from "react-dom";
import "./components/styles/index.css";
import jwt from "jwt-decode";
import App from "./components/App";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { authenticateUser } from "./redux/actions/userActions";
import rootReducer from "./redux/reducers/_rootReducer";

require("dotenv").config();

const store = createStore(rootReducer, applyMiddleware(thunk));

const token = localStorage.getItem("token");

if (token) {
  const user = jwt(token);
  console.log("user in token!");
  console.log(user);
  store.dispatch(authenticateUser(token));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
