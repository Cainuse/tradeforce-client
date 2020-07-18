import axios from "axios";
import { MAKE_OFFER } from "../constants/actionTypes";
import {
  ADD_OFFER_SUCCESS,
  ADD_OFFER_ERROR,
} from "../constants/snackbarMessageTypes";
import { displaySuccess, displayError } from "./snackbarActions";
import { setLoading } from "./loadingActions";

// POST /:postingId/offerings
export const makeOffer = (offering, postId) => {
  return {
    type: MAKE_OFFER,
    offering: offering,
    postId: postId,
  };
};

export const makeOfferAPI = (offering, postId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      // api call
      dispatch(displaySuccess(ADD_OFFER_SUCCESS));
    } catch (e) {
      dispatch(displayError(ADD_OFFER_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
