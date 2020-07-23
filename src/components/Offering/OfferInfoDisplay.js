import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ItemListSection } from "../AddOffering/AddItems/ItemListSection";
import { OfferItemList } from "./OfferItemsList";

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
      fontWeight: "300",
      fontSize: "1.3rem"
    },
    subSectionContainer: {
      paddingBottom: "8px"
    },
    staticTitle: {
      color: theme.palette.primary.main,
      textTransform: "uppercase",
      fontWeight: 500
    },
    offerSection: {
      paddingTop: "30px"
    }
  })
);

export const OfferInfoDisplay = props => {
  let { offer } = props;
  let classes = useStyles();
  let items = offer.offeredItems;

  let [expanded, setExpanded] = useState(-1);

  const handleExpand = (index) => {
    expanded === index ? setExpanded(-1) : setExpanded(index);
  };

  return (
    <Grid container item xs={12} spacing={1} className={classes.offerSection}>
      <Grid container item xs={12} justify={"center"}>
        <Typography className={classes.sectionTitle}>Offer:</Typography>
      </Grid>

      <Grid container item xs={12} alignContent={"center"} style={{paddingBottom: "8px"}}>
        <Grid container item xs={2}>
          <Typography className={classes.staticTitle} style={{ marginRight: "4px" }}>Comment:</Typography>
        </Grid>
        <Grid container item xs={10}>
          <Typography>{offer.comment === "" ? "N/A" : offer.comment}</Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12}  style={{paddingBottom: "8px"}}>
        <Grid container item xs={12}>
          <Grid container item xs={2}>
            <Typography className={classes.staticTitle}
                        style={{ marginRight: "4px", paddingBottom: "5px" }}>Items:</Typography>
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