import React from "react";
import { Grid } from "@material-ui/core";
import { OfferingPreview } from "../OffersReceived/OfferingPreview";
import { OfferSentPreviewCard } from "./OfferSentPreviewCard";

export const OffersSent = (props) => {
  let { currentUser, offersSent } = props;

  return (
    <Grid container alignContent={"center"} justify={"flex-start"} spacing={2}>
      {offersSent.map((offer, index) => {
        return (
          <Grid item key={index}>
            <OfferSentPreviewCard currentUser={currentUser} offer={offer} />
          </Grid>
        );
      })}
    </Grid>
  );
};
