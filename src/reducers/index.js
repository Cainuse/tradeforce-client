import { combineReducers } from "redux";
import { initialState } from "../constants/_initialState";
import { CLICK_MENU_BTN } from "../constants/actionTypes";


const flyoutReducer = (state = initialState.flyoutIsOpen, action) => {
  switch (action.type) {
    case CLICK_MENU_BTN:
      console.log(!state);
      return !state;
    default:
      return false;
  }
}





export default combineReducers( {
    flyoutIsOpen: flyoutReducer,
  }
)