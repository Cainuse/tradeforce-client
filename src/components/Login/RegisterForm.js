import React, { useState } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions/modalActions";
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
import StatusAlert from "./StatusAlert";
import {
  registerUserAsync,
  loginUserAsync,
} from "../../redux/actions/userActions";
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

const RegisterForm = ({ error, modal, dispatch }) => {
  const classes = useStyles();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    let statusMsg;
    await dispatch(
      registerUserAsync(userName, email, "None", new Date(), password, false)
    );
    console.log("register user is done!");
    if (error) {
      setAlertType("error");
      statusMsg = error.message;
    } else {
      statusMsg = "Authentication successful!";
    }
    setMsg(statusMsg);
    setOpen(true);
    // dispatch(closeModal());
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    let statusMsg;
    await dispatch(loginUserAsync(email, password, false));
    console.log("login done");
    if (error) {
      setAlertType("error");
      statusMsg = error.message;
    } else {
      statusMsg = "Authentication successful!";
    }
    setMsg(statusMsg);
    setOpen(true);
    // dispatch(closeModal());
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
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
          <GoogleLogin />
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
                  Don't have an account? Sign up
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="userName"
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
      <StatusAlert
        open={open}
        handleClose={handleClose}
        alertType={alertType}
        msg={msg}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  modal: state.modal,
});

export default connect(mapStateToProps)(RegisterForm);
