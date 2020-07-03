import { initialState } from "../constants/_initialState";
import {
  CLEAR_SNACKBAR,
  DELETE_POSTING,
  UPDATE_ITEM_DETAIL,
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
    default:
      return state;
  }
};
