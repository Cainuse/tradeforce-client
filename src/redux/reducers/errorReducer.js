import { initialState } from "../constants/_initialState";
import { REGISTER_ERROR, LOGIN_ERROR } from "../constants/actionTypes";

export const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        type: action.type,
        message: action.message,
      };
    default:
      return state;
  }
};
