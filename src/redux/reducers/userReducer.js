import { initialState } from "../constants/_initialState";
import {
  SET_USER,
  UNSET_USER,
  IS_USER_FETCHING,
  IS_USER_FAILED,
} from "../constants/actionTypes";

export const userReducer = (state = initialState.currentUser, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        isFetching: false,
        isFailed: false,
        user: action.user,
      };
    case UNSET_USER:
      return {
        isFetching: false,
        isFailed: false,
        user: null,
      };
    case IS_USER_FETCHING:
      return {
        isFetching: true,
        isFailed: state.isFailed,
        user: state.user,
      };
    case IS_USER_FAILED:
      return {
        isFetching: state.isFetching,
        isFailed: true,
        user: state.user,
      };
    default:
      return state;
  }
};
