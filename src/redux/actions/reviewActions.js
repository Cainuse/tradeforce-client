import { ADD_REVIEW } from "../constants/actionTypes";
import { displayError, displaySuccess } from "./snackbarActions";
import {
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_ERROR,
} from "../constants/snackbarMessageTypes";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

const addReviewSuccess = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

export const addReview = ({ review, userToBeReviewed }) => {
  return async (dispatch) => {
    try {
      // api call
      // console.log(`${BASE_URL}/users/${userToBeReviewed}/reviews`);
      // console.log(review);
      await axios.post(`${BASE_URL}/users/${userToBeReviewed}/reviews`, review);
      dispatch(addReviewSuccess(review));
      dispatch(displaySuccess(ADD_REVIEW_SUCCESS));
    } catch (e) {
      // error handling
      dispatch(displayError(ADD_REVIEW_ERROR));
    }
  };
};
