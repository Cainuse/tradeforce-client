import React from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import ItemImagesPreview from "../AddOffering/AddItems/ItemImagesPreview";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingTop: "6px",
  },
  itemCard: {
    borderLeftColor: "#346bc2",
    borderLeft: "solid",
    borderWidth: "4px",
    backgroundColor: "#fafafa",
  },
  itemCardOpen: {
    backgroundColor: "#f6f6f6",
    borderLeftColor: "#6AB547",
    borderLeft: "solid",
    borderWidth: "4px",
  },
  itemName: {
    "&:last-child": {
      paddingBottom: "16px",
    },
  },
  staticLabel: {
    fontWeight: 500,
    textTransform: "capitalize",
    color: "#274C77",
  },
  staticLabelQtyContainer: {
    paddingLeft: "7.5%",
  },
  itemInfo: {
    textTransform: "capitalize",
  },
  itemInfoDescription: {},
  expandableCard: {
    borderTop: "1px solid lightgrey",
  },
  expandIconContainer: {
    display: "inline-grid",
    justifyItems: "center",
    alignContent: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  deleteIconContainer: {
    alignSelf: "flex-start",
    marginTop: "3px",
    marginLeft: "2px",
  },
  deleteIcon: {
    color: "#b8061d",
  },
}));

const imageSection = (classes, images) => {
  if (images.length === 0) {
    return (
      <Grid container item xs={12}>
        <Typography className={classes.staticLabel}>Images:&nbsp;</Typography>
        <Typography className={classes.itemInfo}>N/A</Typography>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      <Grid container item xs={12}>
        <Typography className={classes.staticLabel}>Images:</Typography>
      </Grid>
      <Grid container item xs={12} justify={"center"}>
        <ItemImagesPreview images={images} />
      </Grid>
    </React.Fragment>
  );
};

export const OfferItemList = (props) => {
  let classes = useStyles();
  let { expandedPanelIdx, items, handleExpand } = props;

  return items.map((item, index) => {
    let isExpanded = expandedPanelIdx === index;

    return (
      <React.Fragment key={index}>
        <Grid
          container
          alignContent={"flex-start"}
          className={classes.itemContainer}
        >
          <Grid item xs={12} key={index}>
            <Card
              key={index}
              className={clsx(classes.itemCard, {
                [classes.itemCardOpen]: isExpanded,
              })}
            >
              <Grid container alignContent={"center"}>
                <Grid item xs={11}>
                  <CardContent className={classes.itemName}>
                    <Grid container alignContent={"center"}>
                      <Grid container item xs={6}>
                        <Typography
                          className={classes.staticLabel}
                          color={"primary"}
                        >
                          Name:&nbsp;
                        </Typography>
                        <Typography className={classes.itemInfo}>
                          {item.nameOfItem}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={6}
                        className={classes.staticLabelQtyContainer}
                      >
                        <Typography
                          className={classes.staticLabel}
                          color={"primary"}
                        >
                          Qty:&nbsp;
                        </Typography>
                        <Typography className={classes.itemInfo}>
                          {item.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>

                <Grid item xs={1} className={classes.expandIconContainer}>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: isExpanded,
                    })}
                    onClick={() => {
                      handleExpand(index);
                    }}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>

                <Collapse in={isExpanded} style={{ width: "100%" }}>
                  <CardContent className={classes.expandableCard}>
                    <Grid container item xs={12} spacing={3}>
                      <Grid container item xs={6} sm={6}>
                        <Typography className={classes.staticLabel}>
                          Category:&nbsp;
                        </Typography>
                        <Typography className={classes.itemInfo}>
                          {item.category}
                        </Typography>
                      </Grid>
                      <Grid container item xs={6} sm={6}>
                        <Typography className={classes.staticLabel}>
                          Condition:&nbsp;
                        </Typography>
                        <Typography className={classes.itemInfo}>
                          {item.condition}
                        </Typography>
                      </Grid>
                      <Grid container item xs={12}>
                        <Typography className={classes.staticLabel}>
                          Description:&nbsp;
                        </Typography>
                        <Typography className={classes.itemInfoDescription}>
                          {item.description}
                        </Typography>
                      </Grid>
                      {imageSection(classes, item.images)}
                    </Grid>
                  </CardContent>
                </Collapse>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  });
};
