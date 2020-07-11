import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  value: {
    fontWeight: 500,
    fontSize: "1.6rem",
  },
  title: {
    fontWeight: 300,
    fontSize: "0.9rem",
    textTransform: "capitalize",
  },
}));

function TabLabel(props) {
  const { value, title } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.value}>{value}</Typography>
      <Typography className={classes.title}>{title}</Typography>
    </React.Fragment>
  );
}

export default TabLabel;
