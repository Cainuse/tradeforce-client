import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { loginUserAsync, unsetUser } from "../../redux/actions/userActions";
import { LOGIN_ERROR, LOGOUT_ERROR } from "../../redux/constants/actionTypes";
import { closeModal } from "../../redux/actions/modalActions";
import { setError } from "../../redux/actions/errorActions";
import { connect } from "react-redux";
import StatusAlert from "./StatusAlert";

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
  setError,
  currentUser,
  closeModal,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setToken] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const classes = useStyles();

  useEffect(() => {
    if (currentUser.user) {
      setAlertType("success");
      setMsg("Successfully logged in!");
      setOpenAlert(true);
      closeModal();
      closeModal();
    }
  }, [currentUser.user]);

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
      loginUserAsync(email, password, {
        userName,
        postalCode,
        dateRegistered,
      });
    }

    console.log(currentUser);
    if (currentUser.user) {
      setAlertType("success");
      setMsg("Successfully logged in!");
      setOpenAlert(true);
      closeModal();
    }
  };

  const logout = (response) => {
    console.log(response);
    setLoggedIn(false);
    setToken("");
    unsetUser();
  };

  const handleLoginFailure = (response) => {
    console.log(response);
    setError(LOGIN_ERROR, response);
  };

  const handleLogoutFailure = (response) => {
    console.log(response);
    setError(LOGOUT_ERROR, response);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
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
      <StatusAlert
        open={openAlert}
        msg={msg}
        alertType={alertType}
        handleClose={handleAlertClose}
      />
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
  setError: (type, msg) => dispatch(setError(type, msg)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleBtn);
