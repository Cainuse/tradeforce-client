import { combineReducers } from "redux";
import { flyoutReducer } from "./flyoutReducer";
import { modalReducer } from "./modalReducer";
import { postingsReducer } from "./postingsReducer";
import { userReducer } from "./userReducer";
import { itemDetailReducer } from "./itemDetailReducer";
import { errorReducer } from "./errorReducer";
import { snackbarReducer } from "./snackbarReducer";

const rootReducer = combineReducers({
  flyoutIsOpen: flyoutReducer,
  modal: modalReducer,
  postings: postingsReducer,
  currentUser: userReducer,
  itemDetail: itemDetailReducer,
  error: errorReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
