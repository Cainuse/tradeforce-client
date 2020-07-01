import React, { Component, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "282830719674-g3jh5koi6efcqmvtml24atp923gibqjp.apps.googleusercontent.com";

const useStyles = makeStyles((theme) => ({
  loginBtn: {
    backgroundColor: "#1d588f",
    margin: theme.spacing(1),
  },
}));

const GoogleBtn = () => {
  const [isLogined, setLogined] = useState(false);
  const [accessToken, setToken] = useState("");
  const classes = useStyles();

  const login = (response) => {
    console.log(response);
    if (response.accessToken) {
      setLogined(true);
      setToken(response.accessToken);
    }
  };

  const logout = (response) => {
    console.log(response);
    setLogined(false);
    setToken("");
  };

  const handleLoginFailure = (response) => {
    console.log(response);
  };

  const handleLogoutFailure = (response) => {
    console.log(response);
  };

  return (
    <div>
      {isLogined ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
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
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
      {accessToken ? (
        <h5>
          Your Access Token: <br />
          <br /> {accessToken}
        </h5>
      ) : null}
    </div>
  );
};

export default GoogleBtn;
