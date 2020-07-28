import axios from "axios";

import {
  SET_USER,
  UNSET_USER,
  IS_USER_FETCHING,
  IS_USER_FAILED,
} from "../constants/actionTypes";
import {
  USER_REGISTRATION_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  USER_LOGIN_SUCCESS,
} from "../constants/snackbarMessageTypes";
import { displayError, displaySuccess } from "./snackbarActions";
import { closeModal, openOfferModal } from "./modalActions";
import { MAKE_OFFER_BUTTON } from "../constants/buttonTypes";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const unsetUser = () => {
  return {
    type: UNSET_USER,
  };
};

export const isUserFetching = () => {
  return {
    type: IS_USER_FETCHING,
  };
};

export const isUserFailed = () => {
  return {
    type: IS_USER_FAILED,
  };
};

export const registerUserAsync = (user, openedFrom, postingOwnerId) => {
  let {
    userName,
    firstName,
    lastName,
    email,
    postalCode,
    dateRegistered,
    password,
    isGoogleUser,
  } = user;

  return async (dispatch) => {
    try {
      dispatch(isUserFetching());
      const createUserResp = await axios.post(BASE_URL, {
        userName,
        firstName,
        lastName,
        email,
        postalCode,
        dateRegistered,
        password,
        isGoogleUser,
      });
      const respData = createUserResp.data;

      localStorage.setItem("token", respData.token);
      dispatch(displaySuccess(USER_REGISTRATION_SUCCESS));
      let result = dispatch(
        setUser({
          _id: respData.user._id,
          userName: respData.user.userName,
          firstName: respData.user.firstName,
          lastName: respData.user.lastName,
          email: respData.user.email,
          postalCode: "None",
          dateRegistered: respData.user.dateRegistered,
          isGoogleUser: respData.user.isGoogleUser,
          location: respData.user.location,
        })
      );
      handleAftermathModalBehaviour(
        dispatch,
        openedFrom,
        postingOwnerId,
        respData.user._id
      );
      return result;
    } catch (err) {
      // error occurred while saving user in db
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const loginUserAsync = (
  email,
  password,
  googleInfo,
  openedFrom,
  postingOwnerId
) => {
  return async (dispatch) => {
    dispatch(isUserFetching());

    let user;

    try {
      // check if email exists in db
      user = await axios.get(`${BASE_URL}/findUser/${email}`);
    } catch (err) {
      if (googleInfo) {
        dispatch(displaySuccess(GOOGLE_LOGIN_SUCCESS));
        return await dispatch(
          registerUserAsync({
            userName: googleInfo.userName,
            firstName: googleInfo.givenName,
            lastName: googleInfo.familyName,
            email: email,
            postalCode: "None",
            dateRegistered: googleInfo.dateRegistered,
            password: password,
            isGoogleUser: true,
          })
        );
      }
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }

    try {
      // authenticate user
      const authUserResp = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
        isGoogleLogin: user.data.isGoogleUser,
      });
      const respData = authUserResp.data;

      localStorage.setItem("token", respData.token);
      dispatch(displaySuccess(USER_LOGIN_SUCCESS));
      let result = dispatch(
        setUser({
          _id: respData.user._id,
          userName: respData.user.userName,
          firstName: respData.user.firstName,
          lastName: respData.user.lastName,
          email: respData.user.email,
          postalCode: respData.user.postalCode,
          dateRegistered: respData.user.dateRegistered,
          isGoogleUser: respData.user.isGoogleUser,
          location: respData.user.location,
        })
      );
      handleAftermathModalBehaviour(
        dispatch,
        openedFrom,
        postingOwnerId,
        respData.user._id
      );
      return result;
    } catch (err) {
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const authenticateUser = (token) => {
  return async (dispatch) => {
    try {
      const resp = await axios.post(`${BASE_URL}/authenticate`, { token });
      const user = resp.data;
      return dispatch(
        setUser({
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          postalCode: user.postalCode,
          dateRegistered: user.dateRegistered,
          isGoogleUser: user.isGoogleUser,
          location: user.location,
        })
      );
    } catch (err) {
      dispatch(isUserFailed());
      return dispatch(
        displayError("Authentication failed due to invalid token. Try again!")
      );
    }
  };
};

export const getUserByIdAsync = (userId, cancelToken) => {
  let newCancelToken = cancelToken === undefined ? null : cancelToken;

  return async () => {
    let response = await axios.get(`${BASE_URL}/${userId}`, newCancelToken);
    let user = response.data;
    return user;
  };
};

// Helper functions
const handleAftermathModalBehaviour = (
  dispatch,
  openedFrom,
  postingOwnerId,
  userId
) => {
  if (
    openedFrom === MAKE_OFFER_BUTTON &&
    postingOwnerId !== undefined &&
    postingOwnerId !== userId
  ) {
    dispatch(openOfferModal());
  } else {
    dispatch(closeModal());
  }
};
