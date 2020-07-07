// import { initialState } from "../constants/_initialState";
import {
  ADD_POSTING,
  UPDATE_ITEM_DETAIL,
  DELETE_POSTING,
  LOAD_POSTINGS,
} from "../constants/actionTypes";

const initialState = { postings: [] };

const addPosting = (state, action) => {
  let { posting } = action;
  posting.quantity = parseInt(posting.quantity);
  return [...state, posting];
};

const deletePosting = (state, action) => {
  let { itemId } = action;
  let newState = state.filter((posting) => posting.id !== itemId);
  return newState;
};

const updatePostingDetail = (state, action) => {
  let { itemId, details } = action;
  let newState = state.map((posting) => {
    if (posting._id === itemId) {
      return { ...posting, ...details };
    }
    return posting;
  });
  return newState;
};

const loadPostings = (action) => {
  return action.postings;
};

export const postingsReducer = (state = initialState.postings, action) => {
  switch (action.type) {
    case ADD_POSTING:
      return addPosting(state, action);
    case DELETE_POSTING:
      return deletePosting(state, action);
    case UPDATE_ITEM_DETAIL:
      return updatePostingDetail(state, action);
    case LOAD_POSTINGS:
      return loadPostings(action);
    default:
      return state;
  }
};
