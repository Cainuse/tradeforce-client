import { ADD_REVIEW } from "../constants/actionTypes";

export const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};
