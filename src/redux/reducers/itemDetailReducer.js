import { initialState } from "../constants/_initialState";
import {
  LOAD_ITEM_DETAIL,
  UPDATE_ITEM_DETAIL,
  DELETE_POSTING,
} from "../constants/actionTypes";

// export const itemDetailReducer = (state = initialState.itemDetail, action) => {
//   if (action.type === LOAD_ITEM_DETAIL) {
//     let { itemId, postings } = action;
//     let newState = _.find(postings, { id: itemId });
//     if (newState) {
//       return newState;
//     }
//   } else if (action.type === UPDATE_ITEM_DETAIL) {
//     let { itemId, details } = action;
//     if (state.id === itemId) {
//       return { ...state, ...details };
//     }
//   } else if (action.type === DELETE_POSTING) {
//     let { itemId } = action;
//     if (state.id === itemId) {
//       return {};
//     }
//   }
//   return state;
// };

const loadItemDetail = (item) => {
  return item;
};

const updateItemDetail = (state, item) => {
  if (state._id === item._id) {
    return { ...state, ...item };
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
      return updateItemDetail(state, action.item);
    case DELETE_POSTING:
      return deletePosting();
    default:
      return state;
  }
};
