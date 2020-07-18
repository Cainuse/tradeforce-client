import { initialState } from "../constants/_initialState";
import {
  ADD_POSTING,
  UPDATE_ITEM_DETAIL,
  DELETE_POSTING,
  LOAD_POSTINGS,
  MAKE_OFFER,
  CLEAR_OLD_POSTINGS,
} from "../constants/actionTypes";

const addPosting = (state, action) => {
  let { posting } = action;
  posting.quantity = parseInt(posting.quantity);
  return [...state, posting];
};

const deletePosting = (state, action) => {
  let { itemId } = action;
  let newState = state.filter((posting) => posting._id !== itemId);
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

const makeOffer = (state, action) => {
  let newState = state.map((posting) => {
    if (posting.id === action.postId) {
      if (!posting.offerings) {
        posting["offerings"] = [];
      }
      let updatedOfferings = posting.offerings.concat(action.offering);
      let newPostingDetail = {
        ...posting,
        offerings: updatedOfferings,
      };
      return newPostingDetail;
    }
    return posting;
  });
  return newState;
};

const clearPostings = () => {
  return [];
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
    case MAKE_OFFER:
      return makeOffer(state, action);
    case CLEAR_OLD_POSTINGS:
      return clearPostings();
    default:
      return state;
  }
};
