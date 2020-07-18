import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  registerUserAsync,
  loginUserAsync,
} from "../../redux/actions/userActions";
import { displayError } from "../../redux/actions/snackbarActions";
import GoogleLogin from "./GoogleLoginBtn";

function Copyright() {
  return (
    <Typography color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Tradeforce 2020
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  spaced: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginBtn: {
    textTransform: "none",
  },
}));

const RegisterForm = ({ dispatch, modal, itemDetail }, props) => {
  const classes = useStyles();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = (isLoginForm) => {
    if (isLoginForm) {
      if (email === "" || password === "") {
        dispatch(
          displayError(
            "Some required fields are missing. Please fill them out!"
          )
        );
        return false;
      }
    } else {
      if (
        email === "" ||
        password === "" ||
        userName === "" ||
        fName === "" ||
        lName === ""
      ) {
        dispatch(
          displayError(
            "Some required fields are missing. Please fill them out!"
          )
        );
        return false;
      }
    }

    if (!validateEmail(email)) {
      dispatch(
        displayError(
          "Bad Email address. Please input an appropriate email address."
        )
      );
      return false;
    }

    if (isGmail(email)) {
      dispatch(
        displayError(
          "Gmail address detected. Please use the Google Login for registering or logging in with a Google account."
        )
      );
      return false;
    }

    return true;
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isGmail = (email) => {
    return /@gmail\.com$/.test(email);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (validateForm(false)) {
      await dispatch(
        registerUserAsync(
          {
            userName: userName,
            firstName: fName,
            lastName: lName,
            email: email,
            postalCode: "None",
            dateRegistered: new Date(),
            password: password,
            isGoogleUser: false,
          },
          modal.openedFrom,
          itemDetail.ownerId
        )
      );
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (validateForm(true)) {
      await dispatch(
        loginUserAsync(
          email,
          password,
          false,
          modal.openedFrom,
          itemDetail.ownerId
        )
      );
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "firstName":
        setFName(value);
        break;
      case "lastName":
        setLName(value);
        break;
      default:
        return;
    }
  };

  const toggleShowLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <Container component="main" maxWidth="xs">
      {showLoginForm ? (
        <div className={classes.paper}>
          <Avatar className={classes.spaced}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <GoogleLogin fromButton={props.fromButton} />
          <Typography component="h1" variant="h5">
            Or
          </Typography>

          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmitLogin}
            >
              Sign in
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  className={classes.loginBtn}
                  onClick={toggleShowLoginForm}
                >
                  {`Don't have an account? Sign up`}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.spaced}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <GoogleLogin />
          <Typography component="h1" variant="h5">
            Or
          </Typography>

          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="userName"
                  value={userName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmitRegister}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  className={classes.loginBtn}
                  onClick={toggleShowLoginForm}
                >
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  modal: state.modal,
  itemDetail: state.itemDetail,
});

export default connect(mapStateToProps)(RegisterForm);
