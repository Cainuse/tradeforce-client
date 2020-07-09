import React from "react";
import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { unsetUser } from "../../redux/actions/userActions";
import { closeModal } from "../../redux/actions/modalActions";
import {
  logoutSuccess,
  logoutError,
} from "../../redux/actions/snackbarActions";

const useStyles = makeStyles((theme) => ({
  googleBtn: {
    backgroundColor: "#1d588f",
    margin: theme.spacing(1),
  },
}));

const GoogleLogoutBtn = ({
  unsetUser,
  closeModal,
  logoutSuccess,
  logoutError,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const logout = (response) => {
    localStorage.removeItem("token");
    history.push("/");
    unsetUser();
    logoutSuccess("Successfully logged out!");
    closeModal();
  };

  const handleLogoutFailure = (response) => {
    logoutError("Failed to logout! Try again.");
  };

  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_CLIENT_ID}
      className={classes.googleBtn}
      buttonText="Sign out using Google"
      onLogoutSuccess={logout}
      onFailure={handleLogoutFailure}
    ></GoogleLogout>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  unsetUser: () => dispatch(unsetUser()),
  closeModal: () => dispatch(closeModal()),
  logoutSuccess: (msg) => dispatch(logoutSuccess(msg)),
  logoutError: (msg) => dispatch(logoutError(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogoutBtn);
