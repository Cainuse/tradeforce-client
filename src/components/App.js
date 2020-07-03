import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import NavBar from "./Navigation/NavBar/NavBar";
import NavFlyout from "./Navigation/NavFlyout";
import PathRouter from "./PathRouter";
import ModalContainer from "./ModalContainer";
import FeedbackSnackbar from "./FeedbackSnackbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D588F",
    },
    secondary: {
      main: "#FFFFFF",
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

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <NavBar />
          <PathRouter />
          <ModalContainer />
          <FeedbackSnackbar />
          <div className={classes.flyoutRoot}>
            <NavFlyout />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
