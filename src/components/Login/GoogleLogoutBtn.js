import React from "react";
import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { logoutUser } from "../../redux/actions/userActions";
import { closeModal } from "../../redux/actions/modalActions";
import {
  displaySuccess,
  displayError,
} from "../../redux/actions/snackbarActions";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  googleBtn: {
    backgroundColor: "#1d588f",
    margin: theme.spacing(1),
  },
}));

const GoogleLogoutBtn = ({
  logoutUser,
  closeModal,
  logoutSuccess,
  logoutError,
  currentUser,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
    logoutUser(currentUser.user._id);
    logoutSuccess("Successfully logged out!");
    closeModal();
  };

  const handleLogoutFailure = () => {
    logoutError("Failed to logout! Try again.");
  };

  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_CLIENT_ID}
      className={classes.googleBtn}
      buttonText="Sign out using Google"
      render={(GoogleLogoutBtn) => (
        <MenuItem onClick={GoogleLogoutBtn.onClick}>Logout</MenuItem>
      )}
      onLogoutSuccess={logout}
      onFailure={handleLogoutFailure}
    />
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (userId) => dispatch(logoutUser(userId)),
  closeModal: () => dispatch(closeModal()),
  logoutSuccess: (msg) => dispatch(displaySuccess(msg)),
  logoutError: (msg) => dispatch(displayError(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogoutBtn);
