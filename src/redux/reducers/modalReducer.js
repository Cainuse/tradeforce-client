import { initialState } from "../constants/_initialState";
import {
  CLOSE_MODAL,
  OPEN_OFFER_MODAL,
  OPEN_POSTING_MODAL,
  OPEN_LOGIN_MODAL,
  OPEN_REVIEW_MODAL,
} from "../constants/actionTypes";
import {
  OFFER_MODAL,
  POSTING_MODAL,
  LOGIN_MODAL,
  REVIEW_MODAL,
} from "../constants/modalTypes";
import {
  ADD_POSTING_BUTTON,
  ADD_REVIEW_BUTTON,
  MAKE_OFFER_BUTTON,
} from "../constants/buttonTypes";

export const modalReducer = (state = initialState.modal, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        isOpen: false,
        type: "",
        openedFrom: "",
      };
    case OPEN_OFFER_MODAL:
      return {
        isOpen: true,
        type: OFFER_MODAL,
        openedFrom: MAKE_OFFER_BUTTON,
      };
    case OPEN_POSTING_MODAL:
      return {
        isOpen: true,
        type: POSTING_MODAL,
        openedFrom: ADD_POSTING_BUTTON,
      };
    case OPEN_LOGIN_MODAL:
      return {
        isOpen: true,
        type: LOGIN_MODAL,
        openedFrom: action.openedFrom,
      };
    case OPEN_REVIEW_MODAL:
      return {
        isOpen: true,
        type: REVIEW_MODAL,
        openedFrom: ADD_REVIEW_BUTTON,
      };
    default:
      return {
        isOpen: state.isOpen,
        type: state.type,
        openedFrom: state.openedFrom,
      };
  }
};
