import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { OffererInfoDisplay } from "./OffererInfoDisplay";
import { OfferInfoDisplay } from "./OfferInfoDisplay";
import { closeModal } from "../../redux/actions/modalActions";
import { acceptOffer, declineOffer } from "../../redux/actions/offeringActions";

let useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    position: "relative",
  },
  tabsRoot: {
    marginBottom: "30px",
    outline: "display",
  },
  modalHeader: {
    paddingBottom: "10px",
  },
  submitBtn: {
    backgroundColor: "#6ab547",
  },
  declineBtn: {
    backgroundColor: "#b90202",
    color: "white",
    "&:hover": {
      backgroundColor: "#a00202",
    },
  },
}));

export const OfferingDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const contentInfo = useSelector((state) => {
    return state.modal.contentInfo;
  });
  let { offeringInfo, postingInfo } = contentInfo;
  let { offer, offerer } = offeringInfo;

  const handleAcceptOffer = async () => {
    let result = window.confirm(
      `Are you sure you want to accept this offer? \n` +
        `\n` +
        `All other offers for your post "${postingInfo.title}" will be declined. This action cannot be undone.`
    );

    if (result) {
      await dispatch(acceptOffer(offer._id));
      dispatch(closeModal());
    }
  };

  const handleDeclineOffer = async () => {
    let result = window.confirm(
      `Are you sure you want to decline this offer? This action cannot be undone.`
    );

    if (result) {
      await dispatch(declineOffer(offer._id));
      dispatch(closeModal());
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid container item xs={12} justify={"center"}>
          <Typography
            align="center"
            variant="h4"
            className={classes.modalHeader}
          >
            Offer Details
          </Typography>
        </Grid>

        <Grid container item xs={12} justify={"center"}>
          <Grid container item xs={12} justify={"center"}>
            <OffererInfoDisplay offerer={offerer} postingInfo={postingInfo} />
          </Grid>

          <Grid container item xs={12} justify={"center"}>
            <OfferInfoDisplay offer={offer} />
          </Grid>
        </Grid>

        <Grid container item xs={12} justify={"space-between"}>
          <Grid item xs={3}>
            <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
          </Grid>

          <Grid container item xs={6} justify={"flex-end"} spacing={1}>
            <Grid container item xs={2} justify={"flex-end"}>
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={handleAcceptOffer}
              >
                Accept
              </Button>
            </Grid>
            <Grid container item xs={2} justify={"flex-end"}>
              <Button
                variant={"contained"}
                onClick={handleDeclineOffer}
                className={classes.declineBtn}
              >
                Decline
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
