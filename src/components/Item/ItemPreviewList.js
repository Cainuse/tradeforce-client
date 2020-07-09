import React from "react";
import ItemPreview from "./ItemPreview";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

let useStyles = makeStyles({
  itemPreviewContainer: {
    minHeight: "45vh",
  },
});

const ItemPreviewList = (props) => {
  let classes = useStyles();
  let { postings, items } = props;

  return (
    <Grid
      container
      direction={"row"}
      spacing={3}
      className={classes.itemPreviewContainer}
      alignContent={"center"}
      alignItems={"center"}
    >
      {items.map((item, index) => {
        return (
          <Grid key={index} item xs={3}>
            <ItemPreview
              id={item.id}
              title={item.title}
              datePosted={item.datePosted}
              location={item.location}
              images={item.images}
              postings={postings} //TODO: remove when BE implemented
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ItemPreviewList;
