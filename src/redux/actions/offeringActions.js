import axios from "axios";
import { MAKE_OFFER } from "../constants/actionTypes";
import {
  ADD_OFFER_SUCCESS,
  ADD_OFFER_ERROR,
} from "../constants/snackbarMessageTypes";
import { displaySuccess, displayError } from "./snackbarActions";
import { setLoading } from "./loadingActions";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

const makeOfferSuccess = (offering, postId) => {
  return {
    type: MAKE_OFFER,
    offering: offering,
    postId: postId,
  };
};

export const makeOffer = (offering, postId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const offeringResponse = await axios.post(
        `${BASE_URL}/postings/${postId}/offerings`,
        offering
      );
      dispatch(makeOfferSuccess(offeringResponse.data._id, postId));
      dispatch(displaySuccess(ADD_OFFER_SUCCESS));
    } catch (e) {
      dispatch(displayError(ADD_OFFER_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
