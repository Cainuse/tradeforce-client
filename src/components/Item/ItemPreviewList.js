import React from "react";
import ItemPreview from "./ItemPreview";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

let useStyles = makeStyles({
  itemPreviewContainer: {
    minHeight: "47.5vh",
  },
});

const ItemPreviewList = (props) => {
  let classes = useStyles();
  let { items, sizing } = props;

  return (
    <Grid
      container
      direction={"row"}
      spacing={4}
      className={classes.itemPreviewContainer}
      alignContent={"center"}
      alignItems={"center"}
    >
      {items.map((item, index) => {
        return (
          <Grid key={index} item xs={sizing}>
            <ItemPreview
              _id={item._id}
              title={item.title}
              date={item.date}
              location={item.location}
              images={item.images}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ItemPreviewList;
