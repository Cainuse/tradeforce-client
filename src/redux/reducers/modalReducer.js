import { initialState } from "../constants/_initialState";
import {
  CLOSE_MODAL,
  OPEN_OFFER_MODAL,
  OPEN_POSTING_MODAL,
} from "../constants/actionTypes";
import { OFFER_MODAL, POSTING_MODAL } from "../constants/modalTypes";

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
    default:
      return {
        isOpen: state.isOpen,
        type: state.type,
      };
  }
};
