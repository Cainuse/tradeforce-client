import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { openOfferModal } from "../../redux/actions/modalActions";
import ImageCarousel from "./ImageCarousel";

const tags = [
  "selectedtag1",
  "selectedtag2",
  "selectedtag3",
  "selectedtag4",
  "selectedtag5",
  "selectedtag6",
];
const requestedItems = [
  "Toilet Paper",
  "Hand Sanitizer",
  "Active Dry Yeast",
  "Sourdough Starter",
  "Some Other Thing",
];

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontWeight: 300,
    margin: "0 auto",
    padding: "1rem 1.5rem",
  },
  textBody: {
    fontWeight: 300,
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
    marginTop: 0,
    fontFamily: "Montserrat",
    "& > *": {
      fontWeight: 300,
      marginTop: theme.spacing(1),
      fontSize: "1.1rem",
    },
  },
  detailTitle: {
    fontWeight: 400,
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    fontFamily: "Montserrat",
  },
  qtyVal: {
    fontWeight: 300,
    color: "black",
  },
  trade: {
    marginBottom: theme.spacing(0.5),
  },
}));

function ItemInfo(props) {
  let images = ["bicycle.jpg", "tomato.jpg"];
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={7}>
        <ImageCarousel images={images} />
      </Grid>
      <Grid item xs={4}>
        <Grid container alignItems="center" direction="column">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.openOfferingModal();
            }}
          >
            Make Offer
          </Button>
          <Box my={3} width="60%">
            <p className={classes.detailTitle}>
              Quantity: <span className={classes.qtyVal}>3 available</span>
            </p>
            <p className={classes.detailTitle}>
              Condition: <span className={classes.qtyVal}>Brand New</span>
            </p>
            <p className={clsx(classes.detailTitle, classes.trade)}>
              Looking to trade for:
            </p>
            <ul className={classes.wishlist}>
              {requestedItems.map((val, idx) => (
                <li key={idx}>{val}</li>
              ))}
            </ul>
          </Box>
          <div className={classes.tags}>
            {tags.map((val, idx) => (
              <Chip
                label={val}
                key={idx}
                spacing={2}
                variant="outlined"
                color="primary"
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  openOfferingModal: () => dispatch(openOfferModal()),
});

export default connect(null, mapDispatchToProps)(ItemInfo);
