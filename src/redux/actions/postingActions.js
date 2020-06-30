import {
  ADD_POSTING,
  LOAD_ITEM_DETAIL,
  UPDATE_ITEM_DETAIL,
} from "../constants/actionTypes";

export const addPosting = (posting, currentUser) => {
  return {
    type: ADD_POSTING,
    posting: posting,
    currentUser: currentUser,
  };
};

export const loadItemDetail = (itemId, postings) => {
  return {
    type: LOAD_ITEM_DETAIL,
    itemId: itemId,
    // TODO: postings unnecessary for when BE integrated
    postings: postings,
  };
};

export const updateItemDetail = (itemId, details) => {
  return {
    type: UPDATE_ITEM_DETAIL,
    itemId: itemId,
    details: details,
  };
};
