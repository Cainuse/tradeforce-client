import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import SmsIcon from "@material-ui/icons/Sms";
import { makeStyles } from "@material-ui/core/styles";

import ChatSocketServer from "../../utils/ChatSocketServer";
import {
  displayError,
  displaySuccess
} from "../../redux/actions/snackbarActions";
import { HoverPopoverHOC } from "../HigherOrderComponents/HoverPopoverHOC";

const useStyles = makeStyles((theme) => ({
  messageBtnContainer: {
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    bottom: "5%",
    right: "3%",
    "&:hover": {
      backgroundColor: "#194975"
    }
  }
}));

const MessageButton = ({
                      dispatch,
                      ownerId,
                      currentUser,
                      onMouseEnter,
                      onMouseLeave
                    }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessage = () => {
    if (message === "") {
      dispatch(displayError("Cannot send an empty message. Try again!"));
      return;
    }
    const newMsg = {
      fromUserId: currentUser.user._id,
      toUserId: ownerId,
      content: message,
    };
    ChatSocketServer.sendMessage(newMsg);
    setOpen(false);
    dispatch(
      displaySuccess(
        "Message successfully sent! You may go to the Chat page for continuing a conversation."
      )
    );
  };


  return (
    <div>
      <IconButton
        className={classes.messageBtnContainer}
        onClick={handleClickOpen}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <SmsIcon color={"secondary"}/>
      </IconButton>


      <Dialog
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Type your message below
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            value={message}
            type="text"
            fullWidth
            multiline
            required
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default HoverPopoverHOC("Message Posting Owner")(connect(mapStateToProps)(MessageButton));
