import { initialState } from "../constants/_initialState";
import {
  LOAD_ITEM_DETAIL,
  MAKE_OFFER,
  UPDATE_ITEM_DETAIL,
  DELETE_POSTING,
  CLEAR_OLD_ITEM_DETAILS,
} from "../constants/actionTypes";

const loadItemDetail = (item) => {
  return item;
};

const updateItemDetail = (state, itemId, details) => {
  if (state._id === itemId) {
    return { ...state, ...details };
  }
  return state;
};

const clearPosting = () => {
  return {};
};

const makeOffer = (state, action) => {
  if (!state.offerings) {
    state["offerings"] = [];
  }
  let updatedOffering = state.offerings.concat(action.offering);
  let newState = {
    ...state,
    offerings: updatedOffering,
  };
  return newState;
};

export const itemDetailReducer = (state = initialState.itemDetail, action) => {
  switch (action.type) {
    case LOAD_ITEM_DETAIL:
      return loadItemDetail(action.item);
    case UPDATE_ITEM_DETAIL:
      return updateItemDetail(state, action.itemId, action.details);
    case DELETE_POSTING:
      return clearPosting();
    case MAKE_OFFER:
      return makeOffer(state, action);
    case CLEAR_OLD_ITEM_DETAILS:
      return clearPosting();
    default:
      return state;
  }
};
