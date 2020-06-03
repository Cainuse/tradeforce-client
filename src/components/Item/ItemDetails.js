import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import tomato from "../../images/tomato.jpg";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import ReviewSection from "./ReviewSection";

// Item Details page for in-depth view of offered items

const tags = [
  "selectedtag1",
  "selectedtag2",
  "selectedtag3",
  "selectedtag4",
  "selectedtag5",
  "selectedtag6",
];

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
  },
  button: {
    backgroundColor: "#1d588f",
    color: "white",
    fontWeight: 300,
    margin: "0 auto",
    padding: "1rem 1.5rem",
  },
  header: {
    margin: "1rem 0",
  },
  title: {
    margin: 0,
    fontWeight: 500,
    color: "#1d588f",
  },
  subtitle: {
    fontWeight: 300,
    color: "#4b4b4b",
    margin: "0.3rem 0",
  },
  img: {
    width: "100%",
  },
  description: {
    fontWeight: 400,
  },
  textBody: {
    fontWeight: 300,
  },
  content: {
    margin: 0,
    padding: 0,
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  wishlist: {
    listStyle: "none",
    "& > *": {
      fontWeight: 300,
      marginTop: theme.spacing(1),
      fontSize: "1.25rem",
    },
  },
  detailTitle: {
    fontWeight: 500,
    color: "#1d588f",
    fontSize: "1.4rem",
  },
  qtyVal: {
    fontWeight: 300,
    color: "black",
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

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
      <div className={classes.root}>
        <Button>&lt; Back to Search</Button>
      </div>
      <Container className={classes.root}>
        <Paper elevation={0} className={classes.header}>
          <Typography className={classes.subtitle} variant="subtitle1">
            May 20
          </Typography>
          <Typography className={classes.title} variant="h3">
            Freshly Picked Tomatoes
          </Typography>
          <Typography className={classes.subtitle} variant="subtitle1">
            0.5 km
          </Typography>
        </Paper>
        <Grid container spacing={2} className={classes.content}>
          <Grid item xs={7}>
            <img className={classes.img} src={tomato} alt="tomato"></img>
          </Grid>
          <Grid item xs={4}>
            <Grid container alignItems="center" direction="column">
              <Button variant="contained" color="primary">
                Make Offer
              </Button>
              <Box my={3} width="70%">
                <p className={classes.detailTitle}>
                  Quantity: <span className={classes.qtyVal}>3 available</span>
                </p>
                <p className={classes.detailTitle}>Looking to trade for:</p>
                <ul className={classes.wishlist}>
                  <li>Toilet Paper</li>
                  <li>Hand Sanitizer</li>
                  <li>Active Dry Yeast</li>
                  <li>Sourdough Starter</li>
                </ul>
              </Box>
              <div className={classes.tags}>
                {tags.map((val, idx) => (
                  <Chip label={val} key={idx} spacing={2} />
                ))}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.description} variant="h6">
              Description
            </Typography>
            <Typography className={classes.textBody} variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eu est volutpat, luctus mauris id, bibendum sem. Mauris ultrices
              diam eu metus mattis, ut sodales tellus rhoncus. Nunc eleifend
              rutrum tortor, sit amet mattis mi euismod ac. Mauris diam ante,
              tincidunt in mauris et, ullamcorper fermentum urna.
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <ReviewSection />
      </Container>
    </div>
  );
}
