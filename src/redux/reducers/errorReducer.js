import { initialState } from "../constants/_initialState";
import { ERROR_SNACKBAR } from "../constants/actionTypes";

export const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case ERROR_SNACKBAR:
      return {
        error: action.msg,
        hasError: true,
      };
    default:
      return null;
  }
};
