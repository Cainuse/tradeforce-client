import { combineReducers } from "redux";
import { flyoutReducer } from "./flyoutReducer";
import { modalReducer } from "./modalReducer";

const rootReducer = combineReducers( {
    flyoutIsOpen: flyoutReducer,
    modal: modalReducer,
  }
)

export default rootReducer;