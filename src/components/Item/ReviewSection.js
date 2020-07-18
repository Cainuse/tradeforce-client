import React from "react";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import ReviewList from "../Review/ReviewList";

const useStyles = makeStyles((theme) => ({
  reviewHeader: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  sellerName: {
    textDecoration: "underline",
    textDecorationColor: "#1d588f",
  },
}));

export default function ReviewSection(props) {
  let { itemDetail } = props;
  const classes = useStyles();
  const calculateAverageReview = () => {
    if (itemDetail.ownerReviews.length > 0) {
      let totalRatingValue = _.reduce(
        itemDetail.ownerReviews,
        (acc, review) => acc + review.rating,
        0
      );
      return totalRatingValue / itemDetail.ownerReviews.length;
    }
    return 0;
  };

  const averageRating = calculateAverageReview();

  return (
    <Box>
      <Box display="flex" alignItems="center" className={classes.reviewHeader}>
        <Link
          href={`/profile/user=${itemDetail.ownerId}`}
          color="inherit"
          variant="h6"
          className={classes.sellerName}
        >
          {itemDetail.ownerUsername}
        </Link>
        <Typography variant="h6">Reviews</Typography>
        <Rating
          name="half-rating-read"
          value={averageRating}
          precision={0.5}
          readOnly
        />
      </Box>
      <ReviewList
        elevation={0}
        colour={"#EBEEF1"}
        reviews={itemDetail.ownerReviews}
      />
    </Box>
  );
}
