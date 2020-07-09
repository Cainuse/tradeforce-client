import React from "react";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

export default function Review(props) {
  let { elevation, colour, review } = props;
  return (
    <Box
      p={2}
      display="block"
      width="90%"
      boxShadow={elevation}
      bgcolor={colour}
      my={2}
    >
      <Box display="flex">
        <Box
          color="primary.main"
          fontSize="subtitle1.fontSize"
          fontWeight="fontWeightLight"
          mb={1}
          display="inline"
          flexGrow={1}
        >
          {review.reviewerUsername}
        </Box>
        <Box display="inline" alignContent="center">
          <Rating
            name="half-rating-read"
            value={review.rating}
            precision={0.5}
            readOnly
          />
        </Box>
      </Box>
      <Box fontSize="h5.fontSize" fontWeight="fontWeightMedium" my={1.5}>
        {review.title}
      </Box>
      <Box fontSize="body2.fontSize" fontWeight="fontWeightLight" my={1}>
        {review.review}
      </Box>
    </Box>
  );
}
