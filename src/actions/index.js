import { CLICK_MENU_BTN, MAKE_OFFER } from "../constants/actionTypes";


export const makeOffer = (offering) => {
  return {
    type: MAKE_OFFER,
    offering
  }
}

export const clickMenuBtn = () => {
  return {
    type: CLICK_MENU_BTN,
  }
}