import { MAKE_OFFER } from "../constants/actionTypes";

export const makeOffer = (offering) => {
  return {
    type: MAKE_OFFER,
    offering
  }
}