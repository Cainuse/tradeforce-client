import {
  ADD_POSTING,
  DELETE_POSTING,
  LOAD_ITEM_DETAIL,
  UPDATE_ITEM_DETAIL,
  LOAD_POSTINGS,
} from "../constants/actionTypes";
import {
  LOAD_POSTING_ERROR,
  DELETE_POSTING_ERROR,
  UPDATE_POSTING_ERROR,
  DELETE_POSTING_SUCCESS,
  UPDATE_POSTING_SUCCESS,
} from "../constants/snackbarMessageTypes";
import { displayError, displaySuccess } from "./snackbarActions";
import { setLoading } from "./loadingActions";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

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
      dispatch(setLoading(true));
      let postingRequest = {
        ...posting,
        ownerId: currentUser._id,
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
      return postingResponse.data._id;
    } catch (error) {
      throw new Error();
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const loadAllPostings = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let postingResponse = await axios.get(`${BASE_URL}/postings`);
      dispatch(loadAllPostingsSuccess(postingResponse.data));
    } catch (error) {
      dispatch(displayError(LOAD_POSTING_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const loadPostingsByQuery = (query) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let url = query
        ? `${BASE_URL}/postings/search/${query}`
        : `${BASE_URL}/postings`;
      let postingResponse = await axios.get(url);
      dispatch(loadAllPostingsSuccess(postingResponse.data));
    } catch (error) {
      dispatch(displayError(LOAD_POSTING_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const loadItemDetail = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
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
      throw new Error(error.response.status);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const deletePosting = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`${BASE_URL}/postings/${itemId}`);
      dispatch(deletePostingSuccess(itemId));
      dispatch(displaySuccess(DELETE_POSTING_SUCCESS));
    } catch (error) {
      dispatch(displayError(DELETE_POSTING_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateItemDetail = (itemId, details) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.patch(`${BASE_URL}/postings/${itemId}`, details);
      dispatch(updateItemDetailSuccess(itemId, details));
      dispatch(displaySuccess(UPDATE_POSTING_SUCCESS));
    } catch (error) {
      dispatch(displayError(UPDATE_POSTING_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
