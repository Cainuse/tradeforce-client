import { initialState } from "../constants/_initialState";
import {
  ADD_REVIEW,
  LOAD_USER_DETAIL,
  UPDATE_USER_DETAIL,
  ACCEPT_OFFER,
  DECLINE_OFFER,
  RESCIND_OFFER,
  CLEAR_OLD_USER_DETAILS,
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

// clear previously viewed user profile
const clearPreviousUser = () => {
  return {};
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
    case CLEAR_OLD_USER_DETAILS:
      return clearPreviousUser();
    default:
      return state;
  }
};
