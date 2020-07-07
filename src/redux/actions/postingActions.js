import {
  ADD_POSTING,
  DELETE_POSTING,
  LOAD_ITEM_DETAIL,
  UPDATE_ITEM_DETAIL,
  LOAD_POSTINGS,
} from "../constants/actionTypes";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/postings`;

const addPostingSuccess = (posting) => {
  return {
    type: ADD_POSTING,
    posting: posting,
  };
};

const loadAllPostingsSuccess = (postings) => {
  return {
    type: LOAD_POSTINGS,
    postings: postings,
  };
};

export const loadItemDetail = (itemId, postings) => {
  return {
    type: LOAD_ITEM_DETAIL,
    itemId: itemId,
    // TODO: postings unnecessary for when BE integrated
    postings: postings,
  };
};

export const updateItemDetail = (itemId, details) => {
  return {
    type: UPDATE_ITEM_DETAIL,
    itemId: itemId,
    details: details,
  };
};

export const deletePosting = (itemId) => {
  return {
    type: DELETE_POSTING,
    itemId: itemId,
  };
};

export const addPosting = (posting, currentUser) => {
  return async (dispatch) => {
    try {
      let postingRequest = {
        ...posting,
        ownerId: currentUser._id,
        ownerUsername: currentUser.userName,
        date: new Date(),
        location: currentUser.location,
      };
      let postingResponse = await axios.post(BASE_URL, postingRequest);
      dispatch(addPostingSuccess(postingResponse.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadAllPostings = () => {
  return async (dispatch) => {
    try {
      let postingResponse = await axios.get(BASE_URL);
      dispatch(loadAllPostingsSuccess(postingResponse.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadPostingsByCategory = (category) => {
  return async (dispatch) => {
    try {
      let url = category ? `${BASE_URL}/search/category=${category}` : BASE_URL;
      let postingResponse = await axios.get(url);
      dispatch(loadAllPostingsSuccess(postingResponse.data));
    } catch (error) {
      console.log(error);
    }
  };
};
