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

export const modalReducer = (state = initialState.modal, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        isOpen: false,
        type: "",
      };
    case OPEN_OFFER_MODAL:
      return {
        isOpen: true,
        type: OFFER_MODAL,
      };
    case OPEN_POSTING_MODAL:
      return {
        isOpen: true,
        type: POSTING_MODAL,
      };
    case OPEN_LOGIN_MODAL:
      return {
        isOpen: true,
        type: LOGIN_MODAL,
      };
    case OPEN_REVIEW_MODAL:
      return {
        isOpen: true,
        type: REVIEW_MODAL,
      };
    default:
      return {
        isOpen: state.isOpen,
        type: state.type,
      };
  }
};
