import { initialState } from "../constants/_initialState";
import {
  CLEAR_SNACKBAR,
  DELETE_POSTING,
  ERROR_SNACKBAR,
  SUCCESS_SNACKBAR,
  UPDATE_ITEM_DETAIL,
  REGISTER_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from "../constants/actionTypes";

const defaultSnackBarPosition = {
  vertical: "bottom",
  horizontal: "center",
};

export const snackbarReducer = (state = initialState.snackbar, action) => {
  switch (action.type) {
    case CLEAR_SNACKBAR:
      return {
        isOpen: false,
        type: "",
        message: "",
        position: {},
      };
    case DELETE_POSTING:
      return {
        isOpen: true,
        type: "success",
        message: "Posting successfully deleted",
        position: defaultSnackBarPosition,
      };
    case UPDATE_ITEM_DETAIL:
      return {
        isOpen: true,
        type: "success",
        message: "Posting successfully updated",
        position: defaultSnackBarPosition,
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
    default:
      return state;
  }
};
