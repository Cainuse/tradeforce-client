import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function ItemDescription(props) {
  return (
    <Grid item xs={12}>
      <Typography className={props.classes.description} variant="h6">
        Description
      </Typography>
      <Typography className={props.classes.textBody} variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu
        est volutpat, luctus mauris id, bibendum sem. Mauris ultrices diam eu
        metus mattis, ut sodales tellus rhoncus. Nunc eleifend rutrum tortor,
        sit amet mattis mi euismod ac. Mauris diam ante, tincidunt in mauris et,
        ullamcorper fermentum urna.
      </Typography>
    </Grid>
  );
}
