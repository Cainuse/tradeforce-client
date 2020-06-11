import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducers from "./reducers";

const store = createStore(reducers);

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
