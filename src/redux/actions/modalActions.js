import {
  CLOSE_MODAL,
  OPEN_OFFER_MODAL,
  OPEN_POSTING_MODAL,
  OPEN_LOGIN_MODAL,
} from "../constants/actionTypes";

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const openOfferModal = () => {
  return {
    type: OPEN_OFFER_MODAL,
  };
};

export const openPostingModal = () => {
  return {
    type: OPEN_POSTING_MODAL,
  };
};

export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL,
  };
};
