import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    margin: "1rem 0",
    "& > *": {
      fontFamily: "Montserrat",
    },
  },
  title: {
    margin: 0,
    fontWeight: 400,
    color: theme.palette.primary.main,
  },
  subtitle: {
    fontWeight: 300,
    color: "#4b4b4b",
    margin: "0.3rem 0",
  },
}));

export default function ItemHeader(props) {
  const classes = useStyles();
  let { itemDetail } = props;
  let { datePosted, title, location } = itemDetail;

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString(undefined, options);
  };

  let humanReadableDate = formatDate(datePosted);

  return (
    <Paper elevation={0} className={classes.header}>
      <Typography className={classes.subtitle} variant="subtitle1">
        {humanReadableDate}
      </Typography>
      <Typography className={classes.title} variant="h3">
        {title}
      </Typography>
      <Typography className={classes.subtitle} variant="subtitle1">
        {location}
      </Typography>
    </Paper>
  );
}
