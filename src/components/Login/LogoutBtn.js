import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { logoutUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { displaySuccess } from "../../redux/actions/snackbarActions";

const loggedOutStyles = makeStyles(() => ({
  logoutBtn: {
    fontSize: "1.2rem",
    marginTop: "1%",
    fontWeight: "100",
    textTransform: "none",
  },
}));

const LogoutBtn = ({ logoutUser, currentUser, displaySuccess }) => {
  const classes = loggedOutStyles();
  const history = useHistory();
  return (
    <Button
      type="button"
      color="primary"
      variant="contained"
      className={classes.logoutBtn}
      onClick={() => {
        localStorage.removeItem("token");
        logoutUser(currentUser.user._id);
        displaySuccess("Successfully logged out!");
        history.push("/");
      }}
    >
      Logout
    </Button>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (userId) => dispatch(logoutUser(userId)),
  displaySuccess: (msg) => dispatch(displaySuccess(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutBtn);
