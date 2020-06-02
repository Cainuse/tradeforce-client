import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import tomato from "../../images/tomato.jpg";

// Item Details page for in-depth view of offered items

const useStyles = makeStyles({
  root: {
    fontFamily: "Montserrat",
  },
  button: {
    backgroundColor: "#1d588f",
    color: "white",
    fontWeight: 300,
    margin: "0 auto",
  },
  header: {
    margin: "2rem 0",
  },
  title: {
    fontSize: "2rem",
    margin: 0,
    color: "#1d588f",
  },
  subtitle: {
    fontWeight: 300,
    color: "#4b4b4b",
    margin: "0.3rem 0",
    fontSize: "1rem",
  },
  img: {
    height: "25rem",
  },
  description: {
    fontWeight: 400,
  },
  textBody: {
    fontWeight: 300,
  },
});

export default function ItemDetails() {
  const classes = useStyles();

  return (
    <div>
      {/* TODO: replace with nav component */}
      <AppBar position="static">
        <ToolBar variant="dense">
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        </ToolBar>
      </AppBar>
      <Container className={classes.root}>
        <Paper elevation={0} className={classes.header}>
          <h4 className={classes.subtitle}>May 20</h4>
          <h2 className={classes.title}>Freshly Picked Tomatoes</h2>
          <h4 className={classes.subtitle}>0.5 km</h4>
        </Paper>
        <Paper elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img className={classes.img} src={tomato} alt="tomato"></img>
            </Grid>
            <Grid item xs={6}>
              <Grid container alignItems="center" direction="column">
                <Button variant="contained" className={classes.button}>
                  Make Offer
                </Button>
                <h3>cool thing</h3>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <h3 className={classes.description}>Description</h3>
              <p className={classes.textBody}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus eu est volutpat, luctus mauris id, bibendum sem.
                Mauris ultrices diam eu metus mattis, ut sodales tellus rhoncus.
                Nunc eleifend rutrum tortor, sit amet mattis mi euismod ac.
                Mauris diam ante, tincidunt in mauris et, ullamcorper fermentum
                urna.
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
