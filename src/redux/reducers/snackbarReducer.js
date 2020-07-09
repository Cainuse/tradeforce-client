import { initialState } from "../constants/_initialState";
import {
  CLEAR_SNACKBAR,
  DELETE_POSTING,
  UPDATE_ITEM_DETAIL,
  REGISTER_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from "../constants/actionTypes";

export const snackbarReducer = (state = initialState.snackbar, action) => {
  switch (action.type) {
    case CLEAR_SNACKBAR:
      return {
        isOpen: false,
        type: "",
        message: "",
      };
    case DELETE_POSTING:
      return {
        isOpen: true,
        type: "success",
        message: "Posting successfully deleted",
      };
    case UPDATE_ITEM_DETAIL:
      return {
        isOpen: true,
        type: "success",
        message: "Posting successfully updated",
      };
    case REGISTER_ERROR:
      return {
        isOpen: true,
        type: "error",
        message: action.msg,
      };
    case REGISTER_SUCCESS:
      return {
        isOpen: true,
        type: "success",
        message: action.msg,
      };
    case LOGOUT_ERROR:
      return {
        isOpen: true,
        type: "error",
        message: action.msg,
      };
    case LOGIN_ERROR:
      return {
        isOpen: true,
        type: "error",
        message: action.msg,
      };
    case LOGIN_SUCCESS:
      return {
        isOpen: true,
        type: "success",
        message: action.msg,
      };
    default:
      return state;
  }
};
