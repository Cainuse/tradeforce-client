import React, { useEffect, useState } from "react";
import { Grid, Typography, Link, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OfferingPreviewList } from "./OfferingPreviewList";
import ConfirmationDialog from "../ConfirmationDialog";

const useStyles = makeStyles((theme) => ({
  allOffersContainer: {
    padding: "40px",
    minHeight: "50vh"
  },
  postingOffers: {
    paddingBottom: "35px"
  },
  postingTitle: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main
  },
  numOffering: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main
  },
  title: {
    display: "inherit"
  }
}));

export const OffersReceived = (props) => {
  let classes = useStyles();
  let { activePostings } = props;
  let [expanded, setExpanded] = useState(-1);

  let [confirmationOpen, setConfirmationOpen] = useState(false);
  let [confirmationType, setConfirmationType] = useState("");


  const handleConfirmationOpen = (type) => {
    setConfirmationOpen(true);
    setConfirmationType(type);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setConfirmationType("");
  };

  const selectConfirmationToDisplay = () => {
    if (confirmationOpen) {
      switch (confirmationType) {
        case "accept":
          return (
            <ConfirmationDialog
              open={confirmationOpen}
              submitAction={null}
              submitName={"Accept Offer"}
              dialogMessage={"All other offers for this post will be declined. This action cannot be undone."}
              dialogTitle={"Are you sure you want to accept this offer?"}
            />
          );
        case "decline":
          return (
            <ConfirmationDialog
              open={confirmationOpen}
              submitAction={null}
              submitName={"Decline Offer"}
              dialogMessage={"This action cannot be undone."}
              dialogTitle={"Are you sure you want to decline this offer?"}
            />
          );
        default:
          return null;
      }
    } return null;
  };


  const handleExpand = (index) => {
    expanded === index ? setExpanded(-1) : setExpanded(index);
  };

  const renderAllOfferings = () => {
    return activePostings.map((activePosting, index) => {
      let offerings = activePosting.offerings;

      if (offerings.length > 0) {
        return (
          <React.Fragment key={index}>
            {confirmationOpen && selectConfirmationToDisplay()}
            <Grid container key={index} className={classes.postingOffers} spacing={1}>
              <Grid container item xs={12} key={index} justify={"center"}>
                <Grid item xs={10} className={classes.title}>
                  <Typography className={classes.postingTitle}>
                    Posting: {activePosting.title}
                  </Typography>
                  <Typography className={classes.numOffering}>
                    &nbsp;(Offers: {offerings.length})
                  </Typography>
                </Grid>
                <Grid container item xs={2} justify={"center"}>
                  {expanded === index ?
                    <Link onClick={() => handleExpand(index)}>(Collapse)</Link> :
                    <Link onClick={() => handleExpand(index)}> (Expand) </Link>}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Collapse in={index === expanded}>
                  <OfferingPreviewList offerings={offerings}
                                       fns={{handleConfirmationOpen, handleConfirmationClose}}
                  />
                </Collapse>
              </Grid>
            </Grid>
          </React.Fragment>);
      }
      return null;
    });

  };

  return (
    <Grid container
      // spacing={4}
          justify={"center"}
          alignContent={"flex-start"}
          className={classes.allOffersContainer}
    >
      {renderAllOfferings()}
    </Grid>
  );
};