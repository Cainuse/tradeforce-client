import React from "react";
import { Grid } from "@material-ui/core";

import { OfferingPreview } from "./OfferingPreview";
// import  OfferingPreview  from "./OfferingPreview";

export const OfferingPreviewList = (props) => {
  let { pendingOffers, fns, activePosting } = props;

  return (
    <Grid container alignContent={"center"} justify={"flex-start"} spacing={2}>
      {pendingOffers.map((offer, index) => {
        return (
          <Grid item key={index} >
            <OfferingPreview offer={offer} index={index} fns={fns} activePosting={activePosting}/>
          </Grid>
        );
      })}
    </Grid>
  );
};