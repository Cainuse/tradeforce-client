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

const ItemDetailContainer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ItemHeader />
      <Grid container spacing={2} className={classes.content}>
        <ItemInfo />
        <ItemDescription />
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  itemDetail: state.itemDetail,
});

export default connect(mapStateToProps)(ItemDetailContainer);
