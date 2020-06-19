import React from "react";
import { connect } from "react-redux";
import ItemPreview from "../Item/ItemPreview";
import Grid from "@material-ui/core/Grid";

// this is the page with all the item previews displayed (also includes the result to searching for a specific item)
const ItemResults = ({ postings }) => {
  return (
    <Grid container direction={"row"} spacing={3}>
      {postings.map((item, index) => {
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

const mapStateToProps = (state) => ({
  postings: state.postings,
});

export default connect(mapStateToProps)(ItemResults);
