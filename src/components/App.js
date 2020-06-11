import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import NavBar from "./navBar/NavBar";
import ItemPreview from "./Item/ItemPreview";
import ItemPage from "./Item/ItemPage";
import Grid from "@material-ui/core/Grid";
import { NavFlyout } from "./navBar/NavFlyout";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D588F",
    },
    secondary: {
      main: "#FFFFFF",
    }
  },
  typography: {
    fontFamily: ["Roboto", "Montserrat"].join(","),
  },
});

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  }
}))

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Switch>
            <Route exact path="/">
              <Grid container direction={"row"}>
                <Grid item xs={3}>
                  <ItemPreview title="default item" datePosted={new Date()} />
                </Grid>
                <Grid item xs={3}>
                  <ItemPreview title="default item" datePosted={new Date()} />
                </Grid>
                <Grid item xs={3}>
                  <ItemPreview title="default item" datePosted={new Date()} />
                </Grid>
                <Grid item xs={3}>
                  <ItemPreview title="default item" datePosted={new Date()} />
                </Grid>
                <Grid item xs={3}>
                  <ItemPreview title="default item" datePosted={new Date()} />
                </Grid>
                <Grid item xs={3}>
                  <ItemPreview title="default item" datePosted={new Date()} />
                </Grid>
                <Grid item xs={3}>
                  <ItemPreview title="default item" datePosted={new Date()} />
                </Grid>
                <Grid item xs={3}>
                  <ItemPreview title="default item" datePosted={new Date()} />
                </Grid>
              </Grid>
            </Route>
            <Route exact path="/testItem">
              <ItemPage />
            </Route>
          </Switch>
          <NavBar />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
