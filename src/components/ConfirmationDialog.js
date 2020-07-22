import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class ConfirmationDialog extends React.Component {
  render() {
    const {
      open,
      submitAction,
      submitName,
      dialogMessage,
      dialogTitle,
      handleClose,
    } = this.props;

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submitAction} color="primary">
              {submitName}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default ConfirmationDialog;
