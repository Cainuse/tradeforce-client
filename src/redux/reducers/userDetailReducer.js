import { initialState } from "../constants/_initialState";
import { ADD_REVIEW } from "../constants/actionTypes";

export const userDetailReducer = (state = initialState.userDetail, action) => {
  if (action.type === ADD_REVIEW) {
    let oldReviews = state.reviews || [];
    let reviews = [...oldReviews, action.review];
    return { ...state, reviews };
  }
  return state;
};
