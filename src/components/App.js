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
import { setLoading } from "../redux/actions/loadingActions";

import "../components/styles/monserratFont.css";

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
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    // "*::-webkit-scrollbar-track": {
    //   background: "rgb(0, 0, 0, 0.12)",
    //   border: "4px solid transparent",
    //   backgroundClip: "content-box",
    // },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#acacac",
      borderRadius: "50px",
      height: "120px",
    },
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "#acacac",
    },
  },
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
