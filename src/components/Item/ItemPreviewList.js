import React from "react";
import ItemPreview from "./ItemPreview";
import Grid from "@material-ui/core/Grid";

const ItemPreviewList = (props) => {
  let { postings, items } = props;

  return (
    <Grid container direction={"row"} spacing={3}>
      {items.map((item, index) => {
        return (
          <Grid key={index} item xs={3}>
            <ItemPreview
              id={item.id}
              title={item.title}
              date={item.date}
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
