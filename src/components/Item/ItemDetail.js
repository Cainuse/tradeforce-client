import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

import tomato from "../../images/tomato.jpg";
const tags = [
  "selectedtag1",
  "selectedtag2",
  "selectedtag3",
  "selectedtag4",
  "selectedtag5",
  "selectedtag6",
];

export default function ItemDetail(props) {
  return (
    <React.Fragment>
      <Grid item xs={7}>
        <img className={props.classes.img} src={tomato} alt="tomato"></img>
      </Grid>
      <Grid item xs={4}>
        <Grid container alignItems="center" direction="column">
          <Button variant="contained" color="primary">
            Make Offer
          </Button>
          <Box my={3} width="70%">
            <p className={props.classes.detailTitle}>
              Quantity:{" "}
              <span className={props.classes.qtyVal}>3 available</span>
            </p>
            <p className={props.classes.detailTitle}>Looking to trade for:</p>
            <ul className={props.classes.wishlist}>
              <li>Toilet Paper</li>
              <li>Hand Sanitizer</li>
              <li>Active Dry Yeast</li>
              <li>Sourdough Starter</li>
            </ul>
          </Box>
          <div className={props.classes.tags}>
            {tags.map((val, idx) => (
              <Chip label={val} key={idx} spacing={2} />
            ))}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
