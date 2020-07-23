import {
  CLOSE_MODAL,
  OPEN_OFFER_MODAL,
  OPEN_POSTING_MODAL,
  OPEN_LOGIN_MODAL,
  OPEN_REVIEW_MODAL, OPEN_OFFER_DETAILS_MODAL
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


/**
 *   contentInfo = {
 *      offeringInfo: {
 *        offer,
 *        offerer
 *      },
 *      postingInfo: activePosting,
 *   }
 */
export const openOfferDetailsModal = (contentInfo) => {
  return {
    type: OPEN_OFFER_DETAILS_MODAL,
    contentInfo,
  }
}

export const openPostingModal = () => {
  return {
    type: OPEN_POSTING_MODAL,
  };
};

export const openLoginModal = (openedFrom) => {
  return {
    type: OPEN_LOGIN_MODAL,
    openedFrom,
  };
};

export const openReviewModal = () => {
  return {
    type: OPEN_REVIEW_MODAL,
  };
};
