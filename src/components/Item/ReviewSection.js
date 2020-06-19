import React from "react";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Review from "./Review";

const preventDefault = (event) => event.preventDefault();

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
  return (
    <Box>
      <Box display="flex" alignItems="center" className={classes.reviewHeader}>
        <Link
          href=""
          onClick={preventDefault}
          color="inherit"
          variant="h6"
          className={classes.sellerName}
        >
          {itemDetail.ownerUsername}
        </Link>
        <Typography variant="h6">Reviews</Typography>
        <Rating
          name="half-rating-read"
          defaultValue={4.5}
          precision={0.5}
          readOnly
        />
      </Box>
      <Box my={3} display="flex" justifyContent="center">
        <Review />
      </Box>
      <Box my={3} display="flex" justifyContent="center">
        <Review />
      </Box>
    </Box>
  );
}
