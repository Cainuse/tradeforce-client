import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class ConfirmationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.open,
    };
  }

  handleConfirmationClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { submitAction, submitName, dialogMessage, dialogTitle } = this.props;

    return (
      <Dialog open={this.state.isOpen} onClose={this.handleConfirmationClose}>
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
          <DialogActions>
            <Button onClick={this.handleConfirmationClose} color="primary">
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
