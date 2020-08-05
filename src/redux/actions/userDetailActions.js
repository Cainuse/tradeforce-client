import {
  LOAD_USER_DETAIL,
  UPDATE_USER_DETAIL,
  CLEAR_OLD_USER_DETAILS,
} from "../constants/actionTypes";
import {
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  LOAD_USER_DETAILS_ERROR,
  LOAD_USER_DETAILS_NOT_FOUND_ERROR,
  INVALID_POSTAL_CODE_ERROR,
} from "../constants/snackbarMessageTypes";
import { displayError, displaySuccess } from "./snackbarActions";
import { setLoading } from "./loadingActions";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;

const loadUserDetailSuccess = (user) => {
  return {
    type: LOAD_USER_DETAIL,
    user,
  };
};

const updateUserDetailSuccess = (userId, details) => {
  return {
    type: UPDATE_USER_DETAIL,
    userId: userId,
    details: details,
  };
};

export const clearOldUserDetails = () => {
  return {
    type: CLEAR_OLD_USER_DETAILS,
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
          currentUserId && userId === currentUserId
            ? await axios.get(`${BASE_URL}/${userId}/postings/complete`)
            : await axios.get(`${BASE_URL}/${userId}/postings/active`);
        let inactivePostingResponse = await axios.get(
          `${BASE_URL}/${userId}/postings/inactive`
        );
        userDetails.activePostings = activePostingResponse.data;
        userDetails.inactivePostings = inactivePostingResponse.data;
        let offersSentResponse =
          currentUserId && userId === currentUserId
            ? await axios.get(`${BASE_URL}/${userId}/offerings/active`)
            : null;
        // offersSent === null when currentUser is NOT owner of profile (includes when user is not logged in)
        userDetails.offersSent = offersSentResponse
          ? offersSentResponse.data
          : null;
        dispatch(loadUserDetailSuccess(userDetails));
        return "success";
      } else {
        dispatch(displayError(LOAD_USER_DETAILS_ERROR));
        return "error";
      }
    } catch (e) {
      if (e.response.status === 404) {
        dispatch(displayError(LOAD_USER_DETAILS_NOT_FOUND_ERROR));
      } else {
        dispatch(displayError(LOAD_USER_DETAILS_ERROR));
      }
      return "error";
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateUserDetails = (userId, details) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let updatedResponse = await axios.patch(`${BASE_URL}/${userId}`, details);
      localStorage.setItem("token", updatedResponse.data.token);
      dispatch(updateUserDetailSuccess(userId, updatedResponse.data.body));
      dispatch(displaySuccess(UPDATE_USER_SUCCESS));
      return "success";
    } catch (e) {
      if (e.response.status === 400) {
        dispatch(displayError(INVALID_POSTAL_CODE_ERROR));
      } else {
        dispatch(displayError(UPDATE_USER_ERROR));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};
