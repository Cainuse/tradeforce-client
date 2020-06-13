import { CLICK_MENU_BTN, CLOSE_FLYOUT, } from "../constants/actionTypes";

export const clickMenuBtn = () => {
  return {
    type: CLICK_MENU_BTN,
  }
}

export const closeFlyout = () => {
  return {
    type: CLOSE_FLYOUT,
  }
}
