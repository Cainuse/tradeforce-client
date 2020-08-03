import { initialState } from "../constants/_initialState";
import {
  ADD_REVIEW,
  LOAD_USER_DETAIL,
  UPDATE_USER_DETAIL,
  ACCEPT_OFFER,
  DECLINE_OFFER,
  RESCIND_OFFER,
  ADD_POSTING,
} from "../constants/actionTypes";
import _ from "lodash";

const addReview = (state, action) => {
  let oldReviews = state.reviews || [];
  let reviews = [...oldReviews, action.review];
  return { ...state, reviews };
};

const loadUserDetails = (action) => {
  return action.user;
};

const updateUserDetails = (state, action) => {
  if (state._id === action.userId) {
    return { ...state, ...action.details };
  }
  return state;
};

// take set posting of accepted offer as inactive
const acceptOfferSetInactive = (state, action) => {
  let posting = _.find(state.activePostings, {
    _id: action.offering.postingId,
  });
  posting.active = false;
  let newInactivePostings = [...state.inactivePostings, posting];
  let newActivePostings = _.filter(
    state.activePostings,
    (post) => post._id !== action.offering.postingId
  );
  return {
    ...state,
    activePostings: newActivePostings,
    inactivePostings: newInactivePostings,
  };
};

// update status of offer as rejected
const declineOfferUpdateStatus = (state, action) => {
  let postingId = action.offering.postingId;
  let newActivePostings = _.map(state.activePostings, (post) => {
    if (post._id === postingId) {
      let newOfferings = _.map(post.offerings, (offer) => {
        return offer._id === action.offering._id ? action.offering : offer;
      });
      return { ...post, offerings: newOfferings };
    }
    return post;
  });
  return { ...state, activePostings: newActivePostings };
};

// remove offer from offersSent array
const rescindOfferRemoveFromOffers = (state, action) => {
  let updatedOffersSent = _.filter(
    state.offersSent,
    (offer) => offer._id !== action.offering._id
  );
  return { ...state, offersSent: updatedOffersSent };
};

// add newly created posting to active postings array
const addPosting = (state, action) => {
  let updatedActivePostings = [...state.activePostings, action.posting];
  return { ...state, activePostings: updatedActivePostings };
};

export const userDetailReducer = (state = initialState.userDetail, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return addReview(state, action);
    case LOAD_USER_DETAIL:
      return loadUserDetails(action);
    case UPDATE_USER_DETAIL:
      return updateUserDetails(state, action);
    case ACCEPT_OFFER:
      return acceptOfferSetInactive(state, action);
    case DECLINE_OFFER:
      return declineOfferUpdateStatus(state, action);
    case RESCIND_OFFER:
      return rescindOfferRemoveFromOffers(state, action);
    case ADD_POSTING:
      return addPosting(state, action);
    default:
      return state;
  }
};
