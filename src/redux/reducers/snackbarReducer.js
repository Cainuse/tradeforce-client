import { initialState } from "../constants/_initialState";
import {
  CLEAR_SNACKBAR,
  ERROR_SNACKBAR,
  SUCCESS_SNACKBAR,
  UPDATE_ITEM_DETAIL,
  WARNING_SNACKBAR,
} from "../constants/actionTypes";

export const snackbarReducer = (state = initialState.snackbar, action) => {
  switch (action.type) {
    case CLEAR_SNACKBAR:
      return {
        isOpen: false,
        type: "",
        message: "",
        position: {},
      };
    case SUCCESS_SNACKBAR:
      return {
        isOpen: true,
        type: "success",
        message: action.successMessage,
        position: {
          vertical: "bottom",
          horizontal: "center",
        },
      };
    case ERROR_SNACKBAR:
      return {
        isOpen: true,
        type: "error",
        message: action.errMessage,
        position: {
          vertical: "bottom",
          horizontal: "center",
        },
      };
    case WARNING_SNACKBAR:
      return {
        isOpen: true,
        type: "warning",
        message: action.warningMessage,
        position: {
          vertical: "bottom",
          horizontal: "center",
        },
      }
    default:
      return state;
  }
};
