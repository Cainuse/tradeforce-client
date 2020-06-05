import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function ItemHeader(props) {
  return (
    <Paper elevation={0} className={props.classes.header}>
      <Typography className={props.classes.subtitle} variant="subtitle1">
        May 20
      </Typography>
      <Typography className={props.classes.title} variant="h3">
        Freshly Picked Tomatoes
      </Typography>
      <Typography className={props.classes.subtitle} variant="subtitle1">
        0.5 km
      </Typography>
    </Paper>
  );
}
