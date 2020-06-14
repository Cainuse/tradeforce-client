import { CLOSE_MODAL, OPEN_OFFER_MODAL } from "../constants/actionTypes";

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
