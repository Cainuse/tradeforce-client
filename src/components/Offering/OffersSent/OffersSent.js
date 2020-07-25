import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { OfferSentPreviewCard } from "./OfferSentPreviewCard";
import ConfirmationDialog from "../../ConfirmationDialog";
import { rescindOffer } from "../../../redux/actions/offeringActions";

const useStyles = makeStyles(() => ({
  offersSentContainer: {
    minHeight: "45vh",
  },
}));

export const OffersSent = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  let { currentUser, offersSent } = props;

  let [confirmationOpen, setConfirmationOpen] = useState(false);

  /** offerInfo: { offer, posting, postingOwner } */
  let [offerInfoToActUpon, setOfferInfoToActUpon] = useState({});

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleRescindOffer = async () => {
    let { offer } = offerInfoToActUpon;

    await dispatch(rescindOffer(offer._id));
    setConfirmationOpen(false);
  };

  const selectConfirmationToDisplay = () => {
    let { posting, postingOwner } = offerInfoToActUpon;

    if (confirmationOpen) {
      return (
        <ConfirmationDialog
          open={confirmationOpen}
          submitAction={handleRescindOffer}
          submitName={"Rescind Offer"}
          dialogMessage={`This action cannot be undone.`}
          dialogTitle={
            `Are you sure you want to rescind your offer ` +
            `on ${postingOwner.userName}'s posting "${posting.title}"?`
          }
          handleClose={handleConfirmationClose}
        />
      );
    }
    return null;
  };

  return (
    <Grid
      container
      alignContent={"center"}
      justify={"flex-start"}
      spacing={2}
      className={classes.offersSentContainer}
    >
      {selectConfirmationToDisplay()}
      {offersSent.map((offer, index) => {
        return (
          <Grid item key={index}>
            <OfferSentPreviewCard
              currentUser={currentUser}
              offer={offer}
              fns={{
                setOfferInfoToActUpon,
                handleConfirmationOpen,
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
