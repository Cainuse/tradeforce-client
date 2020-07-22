import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography, Link, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OfferingPreviewList } from "./OfferingPreviewList";
import ConfirmationDialog from "../ConfirmationDialog";
import { acceptOffer, declineOffer } from "../../redux/actions/offeringActions";
import { getAllPendingOffers } from "./OfferingHelpers";

const useStyles = makeStyles((theme) => ({
  allOffersContainer: {
    padding: "40px",
    minHeight: "50vh",
  },
  postingOffers: {
    paddingBottom: "35px",
  },
  postingTitle: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
  },
  numOffering: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
  },
  title: {
    display: "inherit",
  },
}));

export const OffersReceived = (props) => {
  let classes = useStyles();
  let dispatch = useDispatch();
  let { activePostings } = props;

  let [expanded, setExpanded] = useState(-1);
  let [confirmationOpen, setConfirmationOpen] = useState(false);
  let [confirmationType, setConfirmationType] = useState("");

  /** offerInfo: {offerId, offerer, posting} */
  let [offerInfoToActUpon, setOfferInfoToActUpon] = useState({});

  const handleAcceptOffer = async () => {
    let { offerId } = offerInfoToActUpon;
    await dispatch(acceptOffer(offerId));
    handleConfirmationClose();
  };

  const handleConfirmationOpen = (type) => {
    setConfirmationOpen(true);
    setConfirmationType(type);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setConfirmationType("");
    setOfferInfoToActUpon({});
  };

  const handleDeclineOffer = async () => {
    let { offerId } = offerInfoToActUpon;
    await dispatch(declineOffer(offerId));
    handleConfirmationClose();
  };

  const handleExpand = (index) => {
    expanded === index ? setExpanded(-1) : setExpanded(index);
  };

  const selectConfirmationToDisplay = () => {
    let { offerer, posting } = offerInfoToActUpon;

    if (confirmationOpen) {
      switch (confirmationType) {
        case "accept":
          return (
            <ConfirmationDialog
              open={confirmationOpen}
              submitAction={handleAcceptOffer}
              submitName={"Accept Offer"}
              dialogMessage={`All other offers for your post "${posting.title}" will be declined. This action cannot be undone.`}
              dialogTitle={`Are you sure you want to accept ${offerer.userName}'s offer?`}
              handleClose={handleConfirmationClose}
            />
          );
        case "decline":
          return (
            <ConfirmationDialog
              open={confirmationOpen}
              submitAction={handleDeclineOffer}
              submitName={"Decline Offer"}
              dialogMessage={"This action cannot be undone."}
              dialogTitle={`Are you sure you want to decline ${offerer.userName}'s offer?`}
              handleClose={handleConfirmationClose}
            />
          );
        default:
          return null;
      }
    }
    return null;
  };

  const renderAllOfferings = () => {
    return activePostings.map((activePosting, index) => {
      let pendingOffers = getAllPendingOffers(activePosting.offerings);

      if (pendingOffers.length > 0) {
        return (
          <React.Fragment key={index}>
            <Grid
              container
              key={index}
              className={classes.postingOffers}
              spacing={4}
            >
              <Grid container item xs={12} key={index} justify={"center"}>
                <Grid item xs={10} className={classes.title}>
                  <Typography className={classes.postingTitle}>
                    Posting: {activePosting.title}
                  </Typography>
                  <Typography className={classes.numOffering}>
                    &nbsp;(Offers: {pendingOffers.length})
                  </Typography>
                </Grid>
                <Grid container item xs={2} justify={"center"}>
                  {expanded === index ? (
                    <Link onClick={() => handleExpand(index)}>(Collapse)</Link>
                  ) : (
                    <Link onClick={() => handleExpand(index)}> (Expand) </Link>
                  )}
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Collapse in={index === expanded}>
                  <OfferingPreviewList
                    pendingOffers={pendingOffers}
                    activePosting={activePosting}
                    fns={{ handleConfirmationOpen, setOfferInfoToActUpon }}
                  />
                </Collapse>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      }
      return null;
    });
  };

  return (
    <Grid
      container
      justify={"center"}
      alignContent={"flex-start"}
      className={classes.allOffersContainer}
    >
      {selectConfirmationToDisplay()}
      {renderAllOfferings()}
    </Grid>
  );
};
