import { initialState } from "../constants/_initialState";
import { LOAD_ITEM_DETAIL } from "../constants/actionTypes";
import _ from "lodash";

export const itemDetailReducer = (state = initialState.itemDetail, action) => {
  if (action === LOAD_ITEM_DETAIL) {
    let { itemId, postings } = action;
    let newState = _.find(postings, { id: itemId });
    if (newState) {
      return newState;
    }
  }

  return state;
};
