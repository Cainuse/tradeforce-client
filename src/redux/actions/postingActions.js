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

const loadItemDetailSuccess = (item) => {
  return {
    type: LOAD_ITEM_DETAIL,
    item: item,
  };
};

const updateItemDetailSuccess = (itemId, details) => {
  return {
    type: UPDATE_ITEM_DETAIL,
    itemId: itemId,
    details: details,
  };
};

const deletePostingSuccess = (itemId) => {
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

export const loadItemDetail = (itemId) => {
  return async (dispatch) => {
    try {
      let getItemResponse = await axios.get(`${BASE_URL}/${itemId}`);
      dispatch(loadItemDetailSuccess(getItemResponse.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePosting = (itemId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/${itemId}`);
      dispatch(deletePostingSuccess(itemId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateItemDetail = (itemId, details) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${BASE_URL}/${itemId}`, details);
      dispatch(updateItemDetailSuccess(itemId, details));
    } catch (error) {
      console.log(error);
    }
  };
};
