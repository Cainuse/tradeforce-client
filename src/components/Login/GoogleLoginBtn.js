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

const GoogleBtn = ({ loginUserAsync, displayError, modal, itemDetail }) => {
  const classes = useStyles();

  const login = async (response) => {
    const { email, givenName, familyName, imageUrl } = response.profileObj;
    const userName = email.split("@")[0];
    const password = "googlePassword";
    const dateRegistered = new Date();
    const profilePic = imageUrl;

    await loginUserAsync(
      email,
      password,
      {
        userName,
        givenName: givenName ? givenName : "",
        familyName: familyName ? familyName : "",
        dateRegistered,
        profilePic: profilePic ? profilePic : "",
      },
      modal.openedFrom,
      itemDetail.ownerId
    );
  };

  const handleLoginFailure = () => {
    displayError("Google login failed. Please try again!");
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
  itemDetail: state.itemDetail,
});

const mapDispatchToProps = (dispatch) => ({
  loginUserAsync: (email, password, googleInfoObj, openedFrom, postingId) =>
    dispatch(
      loginUserAsync(email, password, googleInfoObj, openedFrom, postingId)
    ),
  unsetUser: () => dispatch(unsetUser()),
  closeModal: () => dispatch(closeModal()),
  displayError: (msg) => dispatch(displayError(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBtn);
