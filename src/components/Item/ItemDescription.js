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

export default function ItemDescription() {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.root}>
      <Typography className={classes.description} variant="h6">
        Description
      </Typography>
      <Typography className={classes.textBody} variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu
        est volutpat, luctus mauris id, bibendum sem. Mauris ultrices diam eu
        metus mattis, ut sodales tellus rhoncus. Nunc eleifend rutrum tortor,
        sit amet mattis mi euismod ac. Mauris diam ante, tincidunt in mauris et,
        ullamcorper fermentum urna.
      </Typography>
    </Grid>
  );
}
