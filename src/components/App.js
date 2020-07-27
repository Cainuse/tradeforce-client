import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import NavBar from "./Navigation/NavBar/NavBar";
import NavDrawer from "./Navigation/NavDrawer";
import PathRouter from "./PathRouter";
import ModalContainer from "./ModalContainer";
import FeedbackSnackbar from "./FeedbackSnackbar";
import { authenticateUser } from "../redux/actions/userActions";
import Loader from "./Loader";
import { displayError } from "../redux/actions/snackbarActions";
import { setLoading } from "../redux/actions/loadingActions";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#01BAEF",
      main: "#1D588F",
    },
    secondary: {
      main: "#FFFFFF",
    },
    info: {
      main: "#00A5E0",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Montserrat"].join(","),
  },
});

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  },
}));

const App = ({ dispatch }) => {
  const classes = useStyles();
  const [render, toRender] = useState(false);

  // do all api calls needed to initialize store as app is loading
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setLoading(true));
      dispatch(authenticateUser(token))
        .then(() => {
          dispatch(setLoading(false));
        })
        .finally(() => {
          toRender(true);
        });
    } else {
      toRender(true);
    }
  }, []);

  return !render ? (
    <Loader />
  ) : (
    <Router>
      <ThemeProvider theme={theme}>
        <Loader />
        <div className={classes.root}>
          <NavBar />
          <PathRouter />
          <ModalContainer />
          <FeedbackSnackbar />
          <div className={classes.flyoutRoot}>
            <NavDrawer />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default connect()(App);
