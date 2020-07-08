// import { initialState } from "../constants/_initialState";
import {
  LOAD_ITEM_DETAIL,
  UPDATE_ITEM_DETAIL,
  DELETE_POSTING,
} from "../constants/actionTypes";

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

export const itemDetailReducer = (state = initialState.itemDetail, action) => {
  switch (action.type) {
    case LOAD_ITEM_DETAIL:
      return loadItemDetail(action.item);
    case UPDATE_ITEM_DETAIL:
      return updateItemDetail(state, action.itemId, action.details);
    case DELETE_POSTING:
      return deletePosting();
    default:
      return state;
  }
};
