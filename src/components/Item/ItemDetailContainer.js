import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ItemDescription from "./ItemDescription";
import ItemHeader from "./ItemHeader";
import ItemInfo from "./ItemInfo";

const useStyles = makeStyles(() => ({
  content: {
    margin: 0,
    padding: 0,
  },
}));

const ItemDetailContainer = (props) => {
  const classes = useStyles();
  let { itemDetail } = props;

  return (
    <React.Fragment>
      <ItemHeader itemDetail={itemDetail} />
      <Grid container spacing={2} className={classes.content}>
        <ItemInfo itemDetail={itemDetail} />
        <ItemDescription itemDetail={itemDetail} />
      </Grid>
    </React.Fragment>
  );
};

export default ItemDetailContainer;
