import _ from "lodash";
import { offeringStatus } from "../constants/OfferingConstants";

const addNumOffers = (sum, activePosting) => {
  let pendingOffers = getAllPendingOffers(activePosting.offerings);
  let numPendingOffersForPosting = pendingOffers.length;
  return sum + numPendingOffersForPosting;
}

export const calculateTotalPendingOffersReceived = (activePostings) => {
  let sumOffersReceived = _.reduce(activePostings, addNumOffers, 0);
  return sumOffersReceived;
}

export const getAllPendingOffers = (offerings) => {
  let pendingOffers = _.filter(offerings, {status: offeringStatus.PENDING});
  return pendingOffers;
}