import { combineReducers } from "redux";
import { flyoutReducer } from "./flyoutReducer";
import { modalReducer } from "./modalReducer";
import { postingsReducer } from "./postingsReducer";
import { userReducer } from "./userReducer";
import { itemDetailReducer } from "./itemDetailReducer";
import { userDetailReducer } from "./userDetailReducer";
import { snackbarReducer } from "./snackbarReducer";
import { loadingReducer } from "./loadingReducer";
import { errorReducer } from "./errorReducer";

const rootReducer = combineReducers({
  flyoutIsOpen: flyoutReducer,
  modal: modalReducer,
  postings: postingsReducer,
  currentUser: userReducer,
  itemDetail: itemDetailReducer,
  userDetail: userDetailReducer,
  snackbar: snackbarReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default rootReducer;
