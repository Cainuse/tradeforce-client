import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
import { loginUserAsync, unsetUser } from "../../redux/actions/userActions";
import { displayError } from "../../redux/actions/snackbarActions";
import { closeModal } from "../../redux/actions/modalActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  googleBtn: {
    backgroundColor: "#1d588f",
    margin: theme.spacing(1),
  },
}));

const GoogleBtn = ({
  loginUserAsync,
  closeModal,
  displayError,
  currentUser,
  modal,
}) => {
  const classes = useStyles();

  const login = async (response) => {
    const { name, email, givenName, familyName } = response.profileObj;
    const userName = name;
    const password = "googlePassword";
    const postalCode = "None";
    const dateRegistered = new Date();

    if (response.accessToken) {
      await loginUserAsync(email, password, {
        userName,
        givenName,
        familyName,
        postalCode,
        dateRegistered,
      },
        modal.openedFrom);
    }
  };

  const handleLoginFailure = (response) => {
    displayError("Google login failed. Please try again!");
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Continue with Google"
      className={classes.googleBtn}
      onSuccess={login}
      onFailure={handleLoginFailure}
      isSignedIn={true}
      cookiePolicy={"single_host_origin"}
    />
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  modal: state.modal,
});

const mapDispatchToProps = (dispatch) => ({
  loginUserAsync: (email, password, googleInfoObj, openedFrom) =>
    dispatch(loginUserAsync(email, password, googleInfoObj, openedFrom)),
  unsetUser: () => dispatch(unsetUser()),
  closeModal: () => dispatch(closeModal()),
  displayError: (msg) => dispatch(displayError(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBtn);
