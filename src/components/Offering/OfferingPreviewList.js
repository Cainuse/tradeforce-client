import React from "react";
import { Grid } from "@material-ui/core";

import { OfferingPreview } from "./OfferingPreview";
// import  OfferingPreview  from "./OfferingPreview";

export const OfferingPreviewList = (props) => {
  let { offerings } = props;

  return (
    <Grid container alignContent={"center"} justify={"flex-start"}>
      {offerings.map((offer, index) => {
        return (
          <Grid item key={index}>
            <OfferingPreview offer={offer} index={index}/>

          </Grid>
        );
      })}
    </Grid>
  );
};