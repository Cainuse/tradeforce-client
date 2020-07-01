import React from "react";
import ReactDOM from "react-dom";
import "./components/styles/index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers/_rootReducer";
import { UserContextProvider } from "./UserContext";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
