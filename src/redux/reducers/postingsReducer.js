import { initialState } from "../constants/_initialState";
import { ADD_POSTING } from "../constants/actionTypes";

export const postingsReducer = (state = initialState.postings, action) => {
  if (action.type === ADD_POSTING) {
    let { currentUser, posting } = action;
    let additionalDetails = {
      id: state.reduce((maxID, posting) => Math.max(maxID, posting.id), -1) + 1,
      ownerID: currentUser.id,
      ownerUsername: currentUser.userName,
      datePosted: new Date(),
      postalCode: currentUser.postalCode,
      location: currentUser.location,
    };
    posting.quantity = parseInt(posting.quantity);
    return [...state, { ...posting, ...additionalDetails }];
  }
  return state;
};
