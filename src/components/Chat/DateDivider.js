import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  text: {
    display: "flex",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: theme.spacing(2),
    "&::before": {
      content: '""',
      borderTop: "1px solid rgb(0, 0, 0, 0.12)",
      margin: "0 10px 0 0",
      flex: "1 0 10px",
    },
    "&::after": {
      content: '""',
      borderTop: "1px solid rgb(0, 0, 0, 0.12)",
      margin: "0 0 0 10px",
      flex: "1 0 10px",
    },
  },
}));

const DateDivider = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography variant="caption" className={classes.text}>
      {children}
    </Typography>
  );
};

export default DateDivider;
