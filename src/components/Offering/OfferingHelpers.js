import _ from "lodash";

const addNumOffers = (sum, activePosting) => {
  let numOffersForPosting = activePosting.offerings.length;
  return sum + numOffersForPosting;
}

export const calculateTotalNumOffersReceived = (activePostings) => {
  let sumOffersReceived = _.reduce(activePostings, addNumOffers, 0);
  return sumOffersReceived;
}