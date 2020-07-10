import {
  SET_USER,
  UNSET_USER,
  IS_USER_FETCHING,
  IS_USER_FAILED,
} from "../constants/actionTypes";
import { displayError, displaySuccess } from "./snackbarActions";
import { closeModal } from "./modalActions";
import axios from "axios";

export const setUser = (
  userId,
  userName,
  firstName,
  lastName,
  email,
  date,
  isGoogleUser
) => {
  return {
    type: SET_USER,
    userId,
    userName,
    firstName,
    lastName,
    email,
    date,
    isGoogleUser,
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

export const registerUserAsync = (
  userName,
  firstName,
  lastName,
  email,
  postalCode,
  dateRegistered,
  password,
  isGoogleUser
) => {
  return async (dispatch) => {
    try {
      dispatch(isUserFetching());
      const createUserResp = await axios.post(
        "http://localhost:3001/api/users",
        {
          userName,
          firstName,
          lastName,
          email,
          postalCode,
          dateRegistered,
          password,
          isGoogleUser,
        }
      );
      const respData = createUserResp.data;

      localStorage.setItem("token", respData.token);
      dispatch(displaySuccess("Your user was successfully registered!"));
      dispatch(closeModal());
      return dispatch(
        setUser(
          respData.user._id,
          respData.user.userName,
          respData.user.firstName,
          respData.user.lastName,
          respData.user.email,
          respData.user.dateRegistered,
          respData.user.isGoogleUser
        )
      );
    } catch (err) {
      // error occurred while saving user in db
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const loginUserAsync = (email, password, googleInfo) => {
  return async (dispatch) => {
    dispatch(isUserFetching());

    let user;

    try {
      // check if email exists in db
      user = await axios.get(
        `http://localhost:3001/api/users/findUser/${email}`
      );
    } catch (err) {
      if (googleInfo) {
        dispatch(displaySuccess("Successfully logged in through Google!"));
        dispatch(closeModal());
        return dispatch(
          registerUserAsync(
            googleInfo.userName,
            googleInfo.givenName,
            googleInfo.familyName,
            email,
            "None",
            googleInfo.dateRegistered,
            password,
            true
          )
        );
      }
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }

    try {
      // authenticate user
      const authUserResp = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email,
          password,
          isGoogleLogin: user.data.isGoogleUser,
        }
      );
      const respData = authUserResp.data;

      localStorage.setItem("token", respData.token);
      dispatch(displaySuccess("Successfully logged into the app!"));
      dispatch(closeModal());
      return dispatch(
        setUser(
          respData.user._id,
          respData.user.userName,
          respData.user.firstName,
          respData.user.lastName,
          respData.user.email,
          respData.user.dateRegistered,
          respData.user.isGoogleUser,
        )
      );
    } catch (err) {
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const authenticateUser = (token) => {
  return async (dispatch) => {
    try {
      let config = {
        headers: {
          "auth-token": token,
        },
      };
      const resp = await axios.post(
        "http://localhost:3001/api/users/authenticate",
        {},
        config
      );
      const user = resp.data;
      return dispatch(
        setUser(
          user._id,
          user.userName,
          user.firstName,
          user.lastName,
          user.email,
          user.dateRegistered,
          user.isGoogleUser,
        )
      );
    } catch (err) {
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }
  };
};
