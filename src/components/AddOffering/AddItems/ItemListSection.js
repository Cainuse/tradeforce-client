import {
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ItemImagesPreview from "./ItemImagesPreview";

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
  itemInfoDescription: {
    // textTransform: "capitalize",
  },
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
      <Grid container item xs={12}>
        {/*<ImageCarousel images={images}/>*/}
        <ItemImagesPreview images={images} />
      </Grid>
    </React.Fragment>
  );
};

export const ItemListSection = (props) => {
  let classes = useStyles();

  return props.addedItems.map((item, index) => {
    return (
      <React.Fragment key={index}>
        <Grid
          container
          alignContent={"flex-start"}
          className={classes.itemContainer}
        >
          <Grid item xs={11} key={index}>
            <Grid item sm={12}>
              <Card
                key={index}
                className={clsx(classes.itemCard, {
                  [classes.itemCardOpen]: index === props.expandedPanelIdx,
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
                        [classes.expandOpen]: index === props.expandedPanelIdx,
                      })}
                      onClick={() => {
                        props.handleExpand(index);
                      }}
                      aria-expanded={index === props.expandedPanelIdx}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Grid>

                  <Collapse in={index === props.expandedPanelIdx}>
                    <CardContent className={classes.expandableCard}>
                      <Grid container spacing={3}>
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
                          <Typography className={classes.itemInfo}>
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

          <Grid
            container
            item
            xs={1}
            className={classes.deleteIconContainer}
            spacing={1}
          >
            <IconButton
              onClick={() => {
                props.deleteItemFromList(index);
              }}
            >
              <DeleteForeverIcon className={classes.deleteIcon} />
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  });
};
