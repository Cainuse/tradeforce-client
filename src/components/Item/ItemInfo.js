import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import { useHistory, useLocation } from "react-router-dom";

import { openOfferModal } from "../../redux/actions/modalActions";
import ImageCarousel from "./ImageCarousel";

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
  let { itemDetail, currentUser } = props;
  let { images, quantity, condition, requestedItems, tags } = itemDetail;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  // const pathItems = location.pathname.split("/");
  // const parentPath = location.pathname.substring(
  //   0,
  //   location.pathname.lastIndexOf("/")
  // );
  // const parentPath = "/" + pathItems[1];

  const editPosting = () => {
    history.push(location.pathname + "/edit");
  };

  return (
    <React.Fragment>
      <Grid item xs={7}>
        <ImageCarousel images={images} />
      </Grid>
      <Grid item xs={4}>
        <Grid container alignItems="center" direction="column">
          {currentUser.id === itemDetail.ownerId ? (
            <Button
              onClick={editPosting}
              // startIcon={<EditIcon />}
              variant="contained"
              color="primary"
            >
              Edit Posting
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                props.openOfferingModal();
              }}
            >
              Make Offer
            </Button>
          )}
          <Box my={3} width="60%">
            <p className={classes.detailTitle}>
              Quantity: <span className={classes.qtyVal}>{quantity}</span>
            </p>
            <p className={classes.detailTitle}>
              Condition:{" "}
              <span className={classes.qtyVal}>{_.startCase(condition)}</span>
            </p>
            <p className={clsx(classes.detailTitle, classes.trade)}>
              Looking to trade for:
            </p>
            <ul className={classes.wishlist}>
              {requestedItems.length >= 1 ? (
                requestedItems.map((val, idx) => {
                  let formattedValue = _.startCase(_.toLower(val));
                  return <li key={idx}>{formattedValue}</li>;
                })
              ) : (
                <li>Open to Anything</li>
              )}
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

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemInfo);
