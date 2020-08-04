import axios from "axios";
import {
  MAKE_OFFER,
  ACCEPT_OFFER,
  DECLINE_OFFER,
  RESCIND_OFFER,
} from "../constants/actionTypes";
import {
  ADD_OFFER_SUCCESS,
  ADD_OFFER_ERROR,
  ACCEPT_OFFER_SUCCESS,
  ACCEPT_OFFER_ERROR,
  DECLINE_OFFER_SUCCESS,
  DECLINE_OFFER_ERROR,
  RESCIND_OFFER_SUCCESS,
  RESCIND_OFFER_ERROR,
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

const acceptOfferSuccess = (offering) => {
  return {
    type: ACCEPT_OFFER,
    offering,
  };
};

const declineOfferSuccess = (offering) => {
  return {
    type: DECLINE_OFFER,
    offering,
  };
};

const rescindOfferSuccess = (offering) => {
  return {
    type: RESCIND_OFFER,
    offering,
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
      return "success";
    } catch (e) {
      dispatch(displayError(ADD_OFFER_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const acceptOffer = (offeringId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const offeringResponse = await axios.post(
        `${BASE_URL}/offerings/${offeringId}/accept`
      );
      dispatch(acceptOfferSuccess(offeringResponse.data));
      dispatch(displaySuccess(ACCEPT_OFFER_SUCCESS));
      return "success";
    } catch (e) {
      dispatch(displayError(ACCEPT_OFFER_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const declineOffer = (offeringId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const offeringResponse = await axios.post(
        `${BASE_URL}/offerings/${offeringId}/reject`
      );
      dispatch(declineOfferSuccess(offeringResponse.data));
      dispatch(displaySuccess(DECLINE_OFFER_SUCCESS));
      return "success";
    } catch (e) {
      dispatch(displayError(DECLINE_OFFER_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const rescindOffer = (offeringId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const offeringResponse = await axios.post(
        `${BASE_URL}/offerings/${offeringId}/rescind`
      );
      dispatch(rescindOfferSuccess(offeringResponse.data));
      dispatch(displaySuccess(RESCIND_OFFER_SUCCESS));
      return "success";
    } catch (e) {
      dispatch(displayError(RESCIND_OFFER_ERROR));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
