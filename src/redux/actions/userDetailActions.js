import { LOAD_USER_DETAIL, UPDATE_USER_DETAIL } from "../constants/actionTypes";
import {
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  LOAD_USER_DETAILS_ERROR,
  LOAD_USER_DETAILS_NOT_FOUND,
} from "../constants/snackbarMessageTypes";
import { displayError, displaySuccess } from "./snackbarActions";
import { setLoading } from "./loadingActions";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;

// TODO: remove addreview once dev merged
export const addReview = (review) => {
  return {
    type: "ADD_REVIEW",
    review,
  };
};

const loadUserDetailSuccess = (user) => {
  return {
    type: LOAD_USER_DETAIL,
    user,
  };
};

const updateUserDetailSuccess = (user) => {
  return {
    type: UPDATE_USER_DETAIL,
    user,
  };
};

export const loadUserDetails = ({ userId, currentUserId }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let response = await axios.get(`${BASE_URL}/${userId}/complete`);
      let userDetails = response.data;
      if (userDetails) {
        let activePostingResponse =
          userId === currentUserId
            ? await axios.get(`${BASE_URL}/${userId}/postings/complete`)
            : await axios.get(`${BASE_URL}/${userId}/postings/active`);
        let inactivePostingResponse = await axios.get(
          `${BASE_URL}/${userId}/postings/inactive`
        );
        userDetails.activePostings = activePostingResponse.data;
        userDetails.inactivePostings = inactivePostingResponse.data;
        dispatch(loadUserDetailSuccess(userDetails));
        return "success";
      } else {
        dispatch(displayError(LOAD_USER_DETAILS_ERROR));
        return "error";
      }
    } catch (e) {
      if (e.response.status === 404) {
        dispatch(displayError(LOAD_USER_DETAILS_NOT_FOUND));
      } else {
        dispatch(displayError(LOAD_USER_DETAILS_ERROR));
      }
      return "error";
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateUserDetails = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      // api call
      dispatch(updateUserDetailSuccess());
      dispatch(displaySuccess(UPDATE_USER_SUCCESS));
    } catch (e) {
      dispatch(displayError(UPDATE_USER_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
