import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { loginUserAsync, unsetUser } from "../../redux/actions/userActions";
import {
  logoutSuccess,
  logoutError,
} from "../../redux/actions/snackbarActions";
import { LOGIN_ERROR, LOGOUT_ERROR } from "../../redux/constants/actionTypes";
import { closeModal } from "../../redux/actions/modalActions";
import { connect } from "react-redux";

const CLIENT_ID =
  "282830719674-g3jh5koi6efcqmvtml24atp923gibqjp.apps.googleusercontent.com";

const useStyles = makeStyles((theme) => ({
  loginBtn: {
    backgroundColor: "#1d588f",
    margin: theme.spacing(1),
  },
}));

const GoogleBtn = ({
  loginUserAsync,
  unsetUser,
  currentUser,
  closeModal,
  logoutError,
  logoutSuccess,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setToken] = useState("");

  const classes = useStyles();

  const login = async (response) => {
    console.log(response);
    const userName = response.profileObj.name;
    const email = response.profileObj.email;
    const password = "googlePassword";
    const postalCode = "None";
    const dateRegistered = new Date();
    console.log(currentUser);

    if (response.accessToken) {
      setLoggedIn(true);
      setToken(response.accessToken);
      await loginUserAsync(email, password, {
        userName,
        postalCode,
        dateRegistered,
      });
      closeModal();
    }
  };

  const logout = (response) => {
    console.log(response);
    setLoggedIn(false);
    setToken("");
    unsetUser();
    logoutSuccess("Successfully logged out!");
    closeModal();
  };

  const handleLoginFailure = (response) => {
    console.log(response);
  };

  const handleLogoutFailure = (response) => {
    console.log(response);
    logoutError("Failed to logout! Try again.");
  };

  return (
    <div>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Sign out"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Continue with Google"
          className={classes.loginBtn}
          onSuccess={login}
          onFailure={handleLoginFailure}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  loginUserAsync: (email, passsword, googleInfoObj) =>
    dispatch(loginUserAsync(email, passsword, googleInfoObj)),
  unsetUser: () => dispatch(unsetUser()),
  closeModal: () => dispatch(closeModal()),
  logoutSuccess: (msg) => dispatch(logoutSuccess(msg)),
  logoutError: (msg) => dispatch(logoutError(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBtn);
