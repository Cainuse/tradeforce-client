import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Montserrat",
  },
  description: {
    fontWeight: 400,
  },
  textBody: {
    fontWeight: 300,
  },
}));

export default function ItemDescription(props) {
  let { itemDetail } = props;
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.root}>
      <Typography className={classes.description} variant="h6">
        Description
      </Typography>
      <Typography className={classes.textBody} variant="body1">
        {itemDetail.description}
      </Typography>
    </Grid>
  );
}
