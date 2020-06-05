import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import ReviewSection from "./ReviewSection";
import ItemDescription from "./ItemDescription";
import ItemHeader from "./ItemHeader";
import ItemDetail from "./ItemDetail";

// Item Details page for in-depth view of offered items

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

export default function ItemPage() {
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
        <ItemHeader classes={classes} />
        <Grid container spacing={2} className={classes.content}>
          <ItemDetail classes={classes} />
          <ItemDescription classes={classes} />
        </Grid>
        <Divider className={classes.divider} />
        <ReviewSection />
      </Container>
    </div>
  );
}
