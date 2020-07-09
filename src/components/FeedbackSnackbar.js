import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { clearSnackbar } from "../redux/actions/snackbarActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FeedbackSnackbar = (props) => {
  const { snackbar, clearSnackbar } = props;

  const handleClose = () => {
    clearSnackbar();
  };

  if (snackbar.isOpen) {
    return (
      <Snackbar
        anchorOrigin={snackbar.position}
        open={snackbar.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbar.type}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({ snackbar: state.snackbar });

export default connect(mapStateToProps, { clearSnackbar })(FeedbackSnackbar);
