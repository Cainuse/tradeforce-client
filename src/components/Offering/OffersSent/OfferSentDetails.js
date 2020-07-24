import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { OffererInfoDisplay } from "../OffersReceived/OffererInfoDisplay";
import { OfferInfoDisplay } from "../OfferInfoDisplay";
import { closeModal } from "../../../redux/actions/modalActions";
import { rescindOffer } from "../../../redux/actions/offeringActions";
import { PostingSummary } from "./PostingSummary";

let useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    position: "relative"
  },
  tabsRoot: {
    marginBottom: "30px",
    outline: "display"
  },
  modalHeader: {
    paddingBottom: "10px"
  },
  submitBtn: {
    backgroundColor: "#6ab547"
  },
  declineBtn: {
    backgroundColor: "#b90202",
    color: "white",
    "&:hover": {
      backgroundColor: "#a00202"
    }
  },
  postingTitle: {
    color: theme.palette.primary.main
  }

}));


/**
 * Structure of contentInfo
 *
 * contentInfo: { offer, posting, postingOwner }
 *
 **/
export const OfferSentDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const contentInfo = useSelector((state) => {
    return state.modal.contentInfo;
  });

  let { offer, posting, postingOwner } = contentInfo;

  const handleRescindOffer = async () => {
    let result = window.confirm(
      `Are you sure you want to rescind your offer? \n` +
      `\n` +
      `This action cannot be undone.`
    );

    if (result) {
      await dispatch(rescindOffer(offer._id));
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
            Offer Sent Details
          </Typography>
        </Grid>

        <Grid container item xs={12} alignContent={"center"}>
          <Typography style={{ paddingRight: "4px" }}>You have made an offer on the posting</Typography>
          <Typography className={classes.postingTitle}>
            <Link href={`/items/item=${posting._id}`}>
              &quot;{posting.title}&quot;
            </Link>
          </Typography>
        </Grid>

        <Grid container item xs={12} justify={"center"}>
          <Grid container item xs={12} justify={"center"}>
            <PostingSummary postingInfo={{ postingOwner, posting }}/>
          </Grid>

          <Grid container item xs={12} justify={"center"} style={{ paddingTop: "40px" }}>
            <OfferInfoDisplay offer={offer} sectionTitle={"Your Offer:"}/>
          </Grid>
        </Grid>

        <Grid container item xs={12} justify={"space-between"}>
          <Grid item xs={3}>
            <Button onClick={() => dispatch(closeModal())}>Close</Button>
          </Grid>

          <Grid container item xs={6} justify={"flex-end"}>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={handleRescindOffer}
            >
              Rescind
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
