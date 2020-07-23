import React from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import OfferContents from "../AddOffering/OfferingContents";
import { makeStyles } from "@material-ui/core/styles";

let useStyles = makeStyles((theme) => ({}));

export const OfferingDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Paper className={classes.paper}>
      <Typography align="center" variant="h4" className={classes.modalHeader}>
        Make an Offer
      </Typography>


      <Grid container justify={"space-between"}>
        <Grid item xs={6}>
          <Button
            onClick={null}
          >
            Cancel
          </Button>
        </Grid>

        <Grid container item xs={6} justify={"flex-end"}>
          <Button
            onClick={null}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};