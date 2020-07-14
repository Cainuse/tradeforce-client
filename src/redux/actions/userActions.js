import {
  SET_USER,
  UNSET_USER,
  IS_USER_FETCHING,
  IS_USER_FAILED
} from "../constants/actionTypes";
import {
  USER_REGISTRATION_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  USER_LOGIN_SUCCESS,
} from "../constants/snackbarMessageTypes";
import { displayError, displaySuccess } from "./snackbarActions";
import { closeModal, openOfferModal } from "./modalActions";
import axios from "axios";
import { MAKE_OFFER_BUTTON } from "../constants/buttonTypes";

// export const setUser = (
//   userId,
//   userName,
//   firstName,
//   lastName,
//   email,
//   date,
//   isGoogleUser
// ) => {
//   return {
//     type: SET_USER,
//     userId,
//     userName,
//     firstName,
//     lastName,
//     email,
//     date,
//     isGoogleUser,
//   };
// };

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};

export const unsetUser = () => {
  return {
    type: UNSET_USER
  };
};

export const isUserFetching = () => {
  return {
    type: IS_USER_FETCHING
  };
};

export const isUserFailed = () => {
  return {
    type: IS_USER_FAILED
  };
};

export const registerUserAsync = (user) => {
  let {
    userName,
    firstName,
    lastName,
    email,
    postalCode,
    dateRegistered,
    password,
    isGoogleUser
  } = user;

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
          isGoogleUser
        }
      );
      const respData = createUserResp.data;

      localStorage.setItem("token", respData.token);
      dispatch(displaySuccess(USER_REGISTRATION_SUCCESS));
      dispatch(closeModal());
      return dispatch(
        setUser({
          _id: respData.user._id,
          userName: respData.user.userName,
          firstName: respData.user.firstName,
          lastName: respData.user.lastName,
          email: respData.user.email,
          postalCode: "None",
          dateRegistered: respData.user.dateRegistered,
          isGoogleUser: respData.user.isGoogleUser
        })
      );
    } catch (err) {
      // error occurred while saving user in db
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const loginUserAsync = (email, password, googleInfo, openedFrom, postingOwnerId) => {
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
        dispatch(displaySuccess(GOOGLE_LOGIN_SUCCESS));
        dispatch(closeModal());
        return await dispatch(
          registerUserAsync({
            userName: googleInfo.userName,
            firstName: googleInfo.givenName,
            lastName: googleInfo.familyName,
            email: email,
            postalCode: "None",
            dateRegistered: googleInfo.dateRegistered,
            password: password,
            isGoogleUser: true
          })
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
          isGoogleLogin: user.data.isGoogleUser
        }
      );
      const respData = authUserResp.data;

      localStorage.setItem("token", respData.token);
      dispatch(displaySuccess(USER_LOGIN_SUCCESS));
      dispatch(closeModal());
      let result = dispatch(
        setUser({
          _id: respData.user._id,
          userName: respData.user.userName,
          firstName: respData.user.firstName,
          lastName: respData.user.lastName,
          email: respData.user.email,
          postalCode: "None",
          dateRegistered: respData.user.dateRegistered,
          isGoogleUser: respData.user.isGoogleUser
        })
      );
      if (openedFrom === MAKE_OFFER_BUTTON && postingOwnerId !== undefined && postingOwnerId !== respData.user._id) {
        dispatch(openOfferModal());
      }
      return result;
      // return dispatch(openOfferModal());
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
          "auth-token": token
        }
      };
      const resp = await axios.post(
        "http://localhost:3001/api/users/authenticate",
        {},
        config
      );
      const user = resp.data;
      return dispatch(
        setUser({
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          postalCode: "None",
          dateRegistered: user.dateRegistered,
          isGoogleUser: user.isGoogleUser
        })
      );
    } catch (err) {
      dispatch(isUserFailed());
      return dispatch(displayError(err.response.data.message));
    }
  };
};
