import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { OffererInfoDisplay } from "./OffererInfoDisplay";
import { OfferInfoDisplay } from "../OfferInfoDisplay";
import { closeModal } from "../../../redux/actions/modalActions";
import {
  acceptOffer,
  declineOffer,
} from "../../../redux/actions/offeringActions";
import ChatSocketServer from "../../../utils/ChatSocketServer";
import ConfirmationDialog from "../../ConfirmationDialog";

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

const OfferingDetails = ({ currentUser }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const contentInfo = useSelector((state) => {
    return state.modal.contentInfo;
  });
  let { offeringInfo, postingInfo } = contentInfo;
  let { offer, offerer } = offeringInfo;
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");

  const handleAcceptOffer = () => {
    handleConfirmationOpen("accept")
  };

  const handleDeclineOffer = () => {
    handleConfirmationOpen("decline")
  };

  const handleConfirmationOpen = (type) => {
    setConfirmationOpen(true);
    setConfirmationType(type);
  };

  const handleCloseAllConfirmationDialogs = () => {
    setConfirmationOpen(false);
    setConfirmationType("");
  }


  const acceptOfferAction = async () => {
    let response = await dispatch(acceptOffer(offer._id));
    if (response) {
      ChatSocketServer.sendMessage({
        fromUserId: currentUser ? currentUser.user._id : 0,
        toUserId: offerer._id,
        content: `Hi there! I've accepted your offering to my posting ${
          postingInfo ? postingInfo.title : ""
        }`,
      });
      ChatSocketServer.sendNotification(offerer._id);
      handleConfirmationOpen("chat");
    } else {
      handleCloseAllConfirmationDialogs();
    }
  };

  const navigateToChat = () => {
    dispatch(closeModal());
    history.push("/chat");
  };

  const declineOfferAction = async () => {
    let response = await dispatch(declineOffer(offer._id));
    dispatch(closeModal());
    if (response) {
      ChatSocketServer.sendNotification(offerer._id);
    }
  };

  const selectConfirmationToDisplay = () => {
    if (confirmationType === "decline") {
      return (
        <ConfirmationDialog
          open={confirmationOpen}
          submitAction={declineOfferAction}
          submitName={"Decline"}
          dialogMessage={"This action cannot be undone"}
          dialogTitle={"Are you sure you want to decline this offer?"}
          handleClose={handleCloseAllConfirmationDialogs}
        />
      );
    } else if (confirmationType === "accept") {
      return (
        <ConfirmationDialog
          open={confirmationOpen}
          submitAction={acceptOfferAction}
          submitName={"Accept"}
          dialogMessage={`All other offers for your post ${postingInfo.title} will be declined. This action cannot be undone.`}
          dialogTitle={"Are you sure you want to accept this offer?"}
          handleClose={handleCloseAllConfirmationDialogs}
        />
      );
    } else if (confirmationType === "chat") {
      return (
        <ConfirmationDialog
          open={confirmationOpen}
          submitAction={navigateToChat}
          submitName={"Go to Chat"}
          dialogMessage={`You can organize your exchange in the chat conversation`}
          dialogTitle={`A message was sent to ${offerer.userName} on your behalf`}
          handleClose={() => {
            setConfirmationOpen(false);
            dispatch(closeModal());
          }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Paper className={classes.paper}>
      {confirmationOpen && selectConfirmationToDisplay()}
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

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(OfferingDetails);
