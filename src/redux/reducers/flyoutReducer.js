import { initialState } from "../constants/_initialState";
import { CLICK_MENU_BTN, CLOSE_FLYOUT, } from "../constants/actionTypes";


export const flyoutReducer = (state = initialState.flyoutIsOpen, action) => {
  switch (action.type) {
    case CLICK_MENU_BTN:
      return !state;
    case CLOSE_FLYOUT:
      return false;
    default:
      return false;
  }
}
