import {
  SET_USER,
  UNSET_USER,
  IS_USER_FETCHING,
  IS_USER_FAILED,
} from "../constants/actionTypes";
import {
  registerError,
  loginError,
  logoutError,
  registerSuccess,
  loginSuccess,
} from "./snackbarActions";
import axios from "axios";

export const setUser = (userId, userName, email, date) => {
  return {
    type: SET_USER,
    userId,
    userName,
    email,
    date,
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
    console.log(getState());
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
      const userData = createUserResp.data;
      console.log(userData);
      dispatch(registerSuccess("Your user was successfully registered!"));
      return dispatch(
        setUser(
          userData._id,
          userData.userName,
          userData.email,
          userData.dateRegistered
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
    console.log(getState());
    let user;
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
      return dispatch(loginError(err.response.data.message));
    }

    try {
      // authenticate user
      const authUserResp = await axios.post(
        "http://localhost:3001/api/users/authenticate",
        {
          email,
          password,
          isGoogleLogin: googleInfo !== null,
        }
      );
      user = authUserResp.data;

      dispatch(loginSuccess("Successfully logged into the app!"));
      return dispatch(
        setUser(user._id, user.userName, user.email, user.dateRegistered)
      );
    } catch (err) {
      return dispatch(loginError(err.response.data.message));
    }
  };
};
