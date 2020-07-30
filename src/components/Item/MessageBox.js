import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ChatSocketServer from "../../utils/ChatSocketServer";
import { displayError } from "../../redux/actions/snackbarActions";

const MessageBox = ({ dispatch, ownerId, currentUser }) => {
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
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        onClick={handleClickOpen}
      >
        Send a message
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
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

export default connect(mapStateToProps)(MessageBox);
