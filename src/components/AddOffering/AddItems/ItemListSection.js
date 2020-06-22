import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    minWidth: "600px",
  },
  itemCard: {
    // borderLeftColor: theme.palette.primary.light,
    // borderLeftColor: "#077187",
    borderLeftColor: "#346bc2",
    // borderLeftColor: "#6AB547",
    borderLeft: "solid",
    borderWidth: "4px",
    backgroundColor: "#fafafa",
  },
  itemCardOpen: {
    // borderLeftColor: theme.palette.primary.light,
    // borderLeftColor: "#346bc2",
    backgroundColor: "#f6f6f6",
    borderLeftColor: "#6AB547",
    borderLeft: "solid",
    borderWidth: "4px",
    // backgroundColor: "#fafafa",
    },
  itemName: {
    "&:last-child": {
      paddingBottom: "16px",
    },
  },
  staticLabel: {
    fontWeight: 500,
    // color: theme.palette.primary.main,
    textTransform: "capitalize",
    color: "#274C77",
  },
  staticLabelQtyContainer: {
    paddingLeft: "7.5%"
  },
  itemInfo: {
    textTransform: "capitalize",
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
      <React.Fragment>
      <Grid item sm={10} key={index} className={classes.itemContainer}>
        <Card key={index} className={clsx(classes.itemCard, {
          [classes.itemCardOpen]: index === props.expandedPanelIdx,
        })}>
          <Grid container alignContent={"center"} >
            <Grid item xs={11}>
              <CardContent className={classes.itemName}>
                <Grid container alignContent={"center"}>
                  <Grid container item xs={6}>
                    <Typography className={classes.staticLabel} color={"primary"}>
                      Name:&nbsp;
                    </Typography>
                    <Typography className={classes.itemInfo}>{item.nameOfItem}</Typography>
                  </Grid>
                  <Grid container item xs={6} className={classes.staticLabelQtyContainer}>
                    <Typography className={classes.staticLabel} color={"primary"}>
                      Qty:&nbsp;
                    </Typography>
                    <Typography className={classes.itemInfo}>{item.quantity}</Typography>
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
                    <Typography className={classes.itemInfo}>{item.category}</Typography>
                  </Grid>
                  <Grid container item xs={6} sm={6}>
                    <Typography className={classes.staticLabel}>
                      Condition:&nbsp;
                    </Typography>
                    <Typography className={classes.itemInfo}>{item.condition}</Typography>
                  </Grid>
                  <Grid container item xs={12}>
                    <Typography className={classes.staticLabel}>
                      Description:&nbsp;
                    </Typography>
                    <Typography className={classes.itemInfo}>{item.description}</Typography>
                  </Grid>
                  <Grid container item xs={12}>
                    <Typography className={classes.staticLabel}>
                      Images:
                    </Typography>
                    {item.images}
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Grid>
        </Card>
      </Grid>
      {/*<Grid container sm={2}>*/}
      {/*  <IconButton>*/}
      {/*    <DeleteForeverIcon />*/}
      {/*  </IconButton>*/}
      {/*</Grid>*/}
      </React.Fragment>
    );
  });
};
