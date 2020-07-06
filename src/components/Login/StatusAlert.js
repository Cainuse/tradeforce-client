import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const StatusAlert = ({ open, handleClose, alertType, msg }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      key={"top" + "right"}
    >
      <MuiAlert
        severity={alertType}
        onClose={handleClose}
        elevation={6}
        variant="filled"
      >
        {msg}
      </MuiAlert>
    </Snackbar>
  );
};

export default StatusAlert;
