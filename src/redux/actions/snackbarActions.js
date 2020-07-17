import {
  CLEAR_SNACKBAR,
  ERROR_SNACKBAR,
  SUCCESS_SNACKBAR,
  WARNING_SNACKBAR,
} from "../constants/actionTypes";

export const clearSnackbar = () => {
  return {
    type: CLEAR_SNACKBAR,
  };
};

export const displayError = (errMessage) => {
  return {
    type: ERROR_SNACKBAR,
    errMessage,
  };
};

export const displaySuccess = (successMessage) => {
  return {
    type: SUCCESS_SNACKBAR,
    successMessage,
  };
};

export const displayWarning = (warningMessage) => {
  return {
    type: WARNING_SNACKBAR,
    warningMessage,
  };
};
