import {
  SET_USER,
  UNSET_USER,
  IS_USER_FETCHING,
  IS_USER_FAILED,
} from "../constants/actionTypes";
import {
  registerError,
  loginError,
  registerSuccess,
  loginSuccess,
} from "./snackbarActions";
import axios from "axios";

export const setUser = (userId, userName, email, date, isGoogleUser) => {
  return {
    type: SET_USER,
    userId,
    userName,
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
  email,
  postalCode,
  dateRegistered,
  password,
  isGoogleUser
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isUserFetching());
      const createUserResp = await axios.post(
        "http://localhost:3001/api/users",
        {
          userName,
          email,
          postalCode,
          dateRegistered,
          password,
          isGoogleUser,
        }
      );
      const respData = createUserResp.data;

      localStorage.setItem("token", respData.token);
      dispatch(registerSuccess("Your user was successfully registered!"));
      return dispatch(
        setUser(
          respData.user._id,
          respData.user.userName,
          respData.user.email,
          respData.user.dateRegistered,
          respData.user.isGoogleUser
        )
      );
    } catch (err) {
      // error occurred while saving user in db
      dispatch(isUserFailed());
      return dispatch(registerError(err.response.data.message));
    }
  };
};

export const loginUserAsync = (email, password, googleInfo) => {
  return async (dispatch, getState) => {
    dispatch(isUserFetching());

    try {
      // check if email exists in db
      await axios.get(`http://localhost:3001/api/users/findUser/${email}`);
    } catch (err) {
      if (googleInfo) {
        dispatch(loginSuccess("Successfully logged in through Google.com!"));
        return dispatch(
          registerUserAsync(
            googleInfo.userName,
            email,
            "None",
            googleInfo.dateRegistered,
            password,
            true
          )
        );
      }
      dispatch(isUserFailed());
      return dispatch(loginError(err.response.data.message));
    }

    try {
      // authenticate user
      const authUserResp = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email,
          password,
          isGoogleLogin: googleInfo !== null,
        }
      );
      const respData = authUserResp.data;

      localStorage.setItem("token", respData.token);
      dispatch(loginSuccess("Successfully logged into the app!"));
      return dispatch(
        setUser(
          respData.user._id,
          respData.user.userName,
          respData.user.email,
          respData.user.dateRegistered,
          respData.user.isGoogleUser
        )
      );
    } catch (err) {
      dispatch(isUserFailed());
      return dispatch(loginError(err.response.data.message));
    }
  };
};

export const authenticateUser = (token) => {
  return async (dispatch, getState) => {
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
          user.email,
          user.dateRegistered,
          user.isGoogleUser
        )
      );
    } catch (err) {
      dispatch(isUserFailed());
      return dispatch(loginError(err.response.data.message));
    }
  };
};
