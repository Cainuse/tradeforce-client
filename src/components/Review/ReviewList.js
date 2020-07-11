import React from "react";
import Review from "./Review";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  reviews: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "45vh",
  },
}));

const ReviewList = (props) => {
  const { elevation, colour, reviews } = props;
  const classes = useStyles();

  return (
    <div className={classes.reviews}>
      {reviews.map((review, idx) => (
        <Review
          elevation={elevation}
          colour={colour}
          key={idx}
          review={review}
        />
      ))}
    </div>
  );
};

export default ReviewList;
