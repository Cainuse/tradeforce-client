// import { initialState } from "../constants/_initialState";
import {
  LOAD_ITEM_DETAIL,
  MAKE_OFFER,
  UPDATE_ITEM_DETAIL,
  DELETE_POSTING,
} from "../constants/actionTypes";
import _ from "lodash";

const initialState = { itemDetail: {} };

const loadItemDetail = (item) => {
  return item;
};

const updateItemDetail = (state, itemId, details) => {
  if (state._id === itemId) {
    return { ...state, ...details };
  }
  return state;
};

const deletePosting = () => {
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
      return deletePosting();
    case MAKE_OFFER:
      return makeOffer(state, action);
    default:
      return state;
  }
};
