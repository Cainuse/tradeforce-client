import { ADD_POSTING } from "../constants/actionTypes";

export const addPosting = (posting, currentUser) => {
  return {
    type: ADD_POSTING,
    posting: posting,
    currentUser: currentUser,
  };
};
