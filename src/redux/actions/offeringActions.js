import { MAKE_OFFER } from "../constants/actionTypes";

export const makeOffer = (offering, postId) => {
  return {
    type: MAKE_OFFER,
    offering: offering,
    postId: postId,
  };
};
