import { combineReducers } from "redux";
import { flyoutReducer } from "./flyoutReducer";
import { modalReducer } from "./modalReducer";
import { postingsReducer } from "./postingsReducer";
import { userReducer } from "./userReducer";
import { itemDetailReducer } from "./itemDetailReducer";
import { userDetailReducer } from "./userDetailReducer";

const rootReducer = combineReducers({
  flyoutIsOpen: flyoutReducer,
  modal: modalReducer,
  postings: postingsReducer,
  currentUser: userReducer,
  itemDetail: itemDetailReducer,
  userDetail: userDetailReducer,
});

export default rootReducer;
