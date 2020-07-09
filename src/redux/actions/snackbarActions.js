import {
  CLEAR_SNACKBAR,
  REGISTER_ERROR,
  LOGOUT_ERROR,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../constants/actionTypes";

export const clearSnackbar = () => {
  return {
    type: CLEAR_SNACKBAR,
  };
};

export const registerError = (msg) => {
  return {
    type: REGISTER_ERROR,
    msg,
  };
};

export const registerSuccess = (msg) => {
  return {
    type: REGISTER_SUCCESS,
    msg,
  };
};

export const loginError = (msg) => {
  return {
    type: LOGIN_ERROR,
    msg,
  };
};

export const loginSuccess = (msg) => {
  return {
    type: LOGIN_SUCCESS,
    msg,
  };
};

export const logoutError = (msg) => {
  return {
    type: LOGOUT_ERROR,
    msg,
  };
};

export const logoutSuccess = (msg) => {
  return {
    type: LOGOUT_SUCCESS,
    msg,
  };
};