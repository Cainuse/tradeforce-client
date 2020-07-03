import { initialState } from "../constants/_initialState";
import {
  LOAD_ITEM_DETAIL,
  MAKE_OFFER,
  UPDATE_ITEM_DETAIL,
  DELETE_POSTING,
} from "../constants/actionTypes";

import _ from "lodash";

export const itemDetailReducer = (state = initialState.itemDetail, action) => {
  if (action.type === LOAD_ITEM_DETAIL) {
    let { itemId, postings } = action;
    let newState = _.find(postings, { id: itemId });
    if (newState) {
      return newState;
    }
  } else if (action.type === MAKE_OFFER) {
    // let offerer = {
    //   id: action.currentUser.id,
    //   userName: action.currentUser.userName,
    //   email: action.currentUser.email,
    // };
    // let updatedOfferings = state.offerings.concat(action.offering);
    // let offering = {
    //   offerer: offerer,
    //   offeredItems: action.offering
    // };
    //TODO: change it so that we don't change state directly. Need to give copy
    state.offerings = state.offerings.concat(action.offering)
    return state;
  } else if (action.type === UPDATE_ITEM_DETAIL) {
    let { itemId, details } = action;
    if (state.id === itemId) {
      return { ...state, ...details };
    }
  } else if (action.type === DELETE_POSTING) {
    let { itemId } = action;
    if (state.id === itemId) {
      return {};
    }
  }
  return state;
};
