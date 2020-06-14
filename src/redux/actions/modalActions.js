import { OPEN_OFFER_MODAL, OPEN_POSTING_MODAL } from "../constants/actionTypes";

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
