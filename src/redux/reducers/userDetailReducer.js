import { initialState } from "../constants/_initialState";
import {
  ADD_REVIEW,
  LOAD_USER_DETAIL,
  UPDATE_USER_DETAIL,
} from "../constants/actionTypes";

const addReview = (state, action) => {
  let oldReviews = state.reviews || [];
  let reviews = [...oldReviews, action.review];
  return { ...state, reviews };
};

const loadUserDetails = (action) => {
  return action.user;
};

const updateUserDetails = (state, action) => {
  if (state._id === action.user._id) {
    return { ...state, ...action.user };
  }
  return state;
};

export const userDetailReducer = (state = initialState.userDetail, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return addReview(state, action);
    case LOAD_USER_DETAIL:
      return loadUserDetails(action);
    case UPDATE_USER_DETAIL:
      return updateUserDetails(state, action);
    default:
      return state;
  }
};
