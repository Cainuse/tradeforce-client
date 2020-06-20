import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    minWidth: "600px",
  },
  itemCard: {
    borderLeftColor: "#6AB547",
    borderLeft: "solid",
    borderWidth: "4px",
    backgroundColor: "#fafafa",
  },
  itemName: {
    "& > *": {
      "& > *": {
        fontSize: "1rem",
        fontWeight: "500",
        textTransform: "capitalize",
      },
    },
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
}));

export const ItemListSection = (props) => {
  //TODO: Delete example of an addItem
  // {
  //   comment: "lol",
  //     nameOfItem: "name",
  //   quantity: 2,
  //   images: [],
  //   description: "description",
  //   category: "Electronics",
  //   condition: "Brand new"
  // },
  let classes = useStyles();

  return props.addedItems.map((item, index) => {
    return (
      <Grid item xs={12} key={index} className={classes.itemContainer}>
        <Card key={index} className={classes.itemCard}>
          <Grid container alignContent={"center"}>
            <Grid item xs={10}>
              <CardHeader
                className={classes.itemName}
                title={item.nameOfItem}
              />
            </Grid>

            <Grid item xs={2} className={classes.expandIconContainer}>
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
              <CardContent>{item.description}</CardContent>
            </Collapse>
          </Grid>
        </Card>
      </Grid>
    );
  });
};
