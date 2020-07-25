import { initialState } from "../constants/_initialState";
import {
  SET_USER,
  UNSET_USER,
  IS_USER_FETCHING,
  IS_USER_FAILED,
  UPDATE_USER_DETAIL,
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
    case UPDATE_USER_DETAIL:
      return {
        isFetching: state.isFetching,
        isFailed: state.isFailed,
        user: {
          ...state.user,
          firstName: action.details.firstName
            ? action.details.firstName
            : state.user.firstName,
          lastName: action.details.lastName
            ? action.details.lastName
            : state.user.lastName,
          postalCode: action.details.postalCode
            ? action.details.postalCode
            : state.user.postalCode,
          location: action.details.location
            ? action.details.location
            : state.user.location,
        },
      };
    default:
      return state;
  }
};
