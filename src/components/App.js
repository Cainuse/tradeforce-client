import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NavBar from "./navBar/NavBar";
import ItemPreview from "./Item/ItemPreview";
import ItemPage from "./Item/ItemPage";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D588F",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Montserrat"].join(","),
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Grid container direction={"horizontal"}>
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
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
