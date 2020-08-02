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
  let { postingPreviews } = state;
  let { posting } = action;

  let newPostingPreviews = [...postingPreviews, posting];
  let newState = {
    ...state,
    newPostingPreviews,
  };
  return newState;
};

const deletePosting = (state, action) => {
  let { postingPreviews } = state;

  let { itemId } = action;
  let newPostingPreviews = postingPreviews.filter(
    (posting) => posting._id !== itemId
  );
  let newState = {
    ...state,
    postingPreviews: newPostingPreviews,
  };
  return newState;
};

const updatePostingDetail = (state, action) => {
  let { itemId, details } = action;
  let { postingPreview } = state;

  let newPostingPreview = postingPreview.map((posting) => {
    if (posting._id === itemId) {
      return { ...posting, ...details };
    }
    return posting;
  });

  let newState = {
    ...state,
    postingPreview: newPostingPreview,
  };
  return newState;
};

const loadPostings = (action) => {
  return action.postings;
};

const makeOffer = (state, action) => {
  const { postingPreviews } = state;

  let newPostingPreviews = updatePostingOfferings({ postingPreviews, action });

  let newState = {
    ...state,
    postingPreviews: newPostingPreviews,
  };

  console.log(newState);
  return newState;
};

const clearPostings = () => {
  return {
    numPages: 0,
    numResults: 0,
    postingPreviews: [],
  };
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

// ------------------ Helpers ----------------------- //
const updatePostingOfferings = ({ postingPreviews, action }) => {
  return postingPreviews.map((posting) => {
    if (posting.id === action.postId) {
      if (posting.offerings === undefined) {
        posting["offerings"] = [];
      }
      let updatedOfferings = posting.offerings.concat(action.offering._id);
      let newPostingDetail = {
        ...posting,
        offerings: updatedOfferings,
      };
      return newPostingDetail;
    }
    return posting;
  });
};
