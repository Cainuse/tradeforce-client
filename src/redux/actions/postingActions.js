import {
  ADD_POSTING,
  DELETE_POSTING,
  LOAD_ITEM_DETAIL,
  UPDATE_ITEM_DETAIL,
  LOAD_POSTINGS,
  ERROR_SNACKBAR,
} from "../constants/actionTypes";
import { setLoading } from "./loadingActions";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

const addPostingSuccess = (posting) => {
  return {
    type: ADD_POSTING,
    posting: posting,
  };
};

const addPostingError = () => {
  return {
    type: ERROR_SNACKBAR,
    msg: "Something went wrong. Posting was not created",
  };
};

const loadAllPostingsSuccess = (postings) => {
  return {
    type: LOAD_POSTINGS,
    postings: postings,
  };
};

const loadPostingsError = () => {
  return {
    type: ERROR_SNACKBAR,
    msg: "Something went wrong. Postings could not be loaded",
  };
};

const loadItemDetailSuccess = (item) => {
  return {
    type: LOAD_ITEM_DETAIL,
    item: item,
  };
};

const loadItemDetailError = (msg) => {
  return {
    type: ERROR_SNACKBAR,
    msg: msg,
  };
};

const updateItemDetailSuccess = (itemId, details) => {
  return {
    type: UPDATE_ITEM_DETAIL,
    itemId: itemId,
    details: details,
  };
};

const updateItemDetailError = () => {
  return {
    type: ERROR_SNACKBAR,
    msg: "Something went wrong. Posting was not updated",
  };
};

const deletePostingSuccess = (itemId) => {
  return {
    type: DELETE_POSTING,
    itemId: itemId,
  };
};

const deletePostingError = () => {
  return {
    type: ERROR_SNACKBAR,
    msg: "Something went wrong. Posting was not deleted",
  };
};

export const addPosting = (posting, currentUser) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      let postingRequest = {
        ...posting,
        ownerId: currentUser._id,
        // ownerUsername: currentUser.userName,
        date: new Date(),
        location: currentUser.location
          ? currentUser.location
          : "The Darkest Timeline",
      };
      let postingResponse = await axios.post(
        `${BASE_URL}/postings`,
        postingRequest
      );
      dispatch(addPostingSuccess(postingResponse.data));
    } catch (error) {
      dispatch(addPostingError());
    }
  };
};

export const loadAllPostings = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      let postingResponse = await axios.get(`${BASE_URL}/postings`);
      dispatch(loadAllPostingsSuccess(postingResponse.data));
    } catch (error) {
      dispatch(loadPostingsError());
    }
  };
};

export const loadPostingsByCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      let url = category
        ? `${BASE_URL}/postings/search/category=${category}`
        : `${BASE_URL}/postings`;
      let postingResponse = await axios.get(url);
      dispatch(loadAllPostingsSuccess(postingResponse.data));
    } catch (error) {
      dispatch(loadPostingsError());
    }
  };
};

export const loadItemDetail = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      let getItemResponse = await axios.get(`${BASE_URL}/postings/${itemId}`);
      let userId = getItemResponse.data.ownerId
        ? getItemResponse.data.ownerId
        : 0;
      let getUserInfo = await axios.get(`${BASE_URL}/users/${userId}`);
      let ownerUsername = getUserInfo.data.userName
        ? getUserInfo.data.userName
        : "Unavailable";
      let item = {
        ...getItemResponse.data,
        ownerUsername,
      };
      dispatch(loadItemDetailSuccess(item));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(
          loadItemDetailError("Something went wrong. Posting not found")
        );
      } else {
        dispatch(
          loadItemDetailError("Something went wrong. Please try again later")
        );
      }
      throw new Error(error);
    }
  };
};

export const deletePosting = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      await axios.delete(`${BASE_URL}/postings/${itemId}`);
      dispatch(deletePostingSuccess(itemId));
    } catch (error) {
      dispatch(deletePostingError());
    }
  };
};

export const updateItemDetail = (itemId, details) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      await axios.patch(`${BASE_URL}/postings/${itemId}`, details);
      dispatch(updateItemDetailSuccess(itemId, details));
    } catch (error) {
      dispatch(updateItemDetailError());
    }
  };
};
