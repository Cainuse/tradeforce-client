import React, { useState } from "react";
import moment from "moment";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { OfferItemList } from "./OffersReceived/OfferItemsList";

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    fontWeight: "300",
    fontSize: "1.3rem",
  },
  subSectionContainer: {
    paddingBottom: "8px",
  },
  staticTitle: {
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    fontWeight: 500,
  },
  offerSection: {
    paddingTop: "30px",
  },
}));

export const OfferInfoDisplay = (props) => {
  let { offer, sectionTitle } = props;
  let classes = useStyles();
  let items = offer.offeredItems;
  let newSectionTitle = sectionTitle === undefined ? "Offer:" : sectionTitle;

  let [expanded, setExpanded] = useState(-1);

  const handleExpand = (index) => {
    expanded === index ? setExpanded(-1) : setExpanded(index);
  };

  return (
    <Grid container item xs={12} spacing={1} className={classes.offerSection}>
      <Grid container item xs={12} justify={"center"}>
        <Typography className={classes.sectionTitle}>
          {newSectionTitle}
        </Typography>
      </Grid>

      <Grid
        container
        item
        xs={12}
        alignContent={"center"}
        style={{ paddingBottom: "8px" }}
      >
        <Grid container item xs={2}>
          <Typography
            className={classes.staticTitle}
            style={{ marginRight: "4px" }}
          >
            DATE:
          </Typography>
        </Grid>
        <Grid container item xs={10}>
          <Typography>{moment(offer.date).format("MMMM Do YYYY")}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        alignContent={"center"}
        style={{ paddingBottom: "8px" }}
      >
        <Grid container item xs={2}>
          <Typography
            className={classes.staticTitle}
            style={{ marginRight: "4px" }}
          >
            Comment:
          </Typography>
        </Grid>
        <Grid container item xs={10}>
          <Typography>
            {offer.comment === "" ? "N/A" : offer.comment}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} style={{ paddingBottom: "8px" }}>
        <Grid container item xs={12}>
          <Grid container item xs={2}>
            <Typography
              className={classes.staticTitle}
              style={{ marginRight: "4px", paddingBottom: "5px" }}
            >
              Items:
            </Typography>
          </Grid>
          {items.length === 0 ? (
            <Grid container item xs={10}>
              <Typography className={classes.text}>N/A</Typography>
            </Grid>
          ) : null}
        </Grid>

        {items !== 0 ? (
          <Grid container item xs={12}>
            <OfferItemList
              expandedPanelIdx={expanded}
              items={items}
              handleExpand={handleExpand}
            />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};
