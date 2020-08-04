import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getUserByIdAsync } from "../../redux/actions/userActions";

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

const ItemHeader = (props) => {
  const classes = useStyles();
  const [loc, setLoc] = useState("");

  let { itemDetail } = props;
  let { date, title, location } = itemDetail;

  const getUpdatedLocation = async () => {
    if (location && location.location) {
      setLoc(location.location);
    } else {
      const user = await props.dispatch(getUserByIdAsync(itemDetail.ownerId));
      setLoc(user.location.location);
    }
  };

  useEffect(() => {
    getUpdatedLocation();
  }, []);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString(undefined, options);
  };

  let humanReadableDate = formatDate(date);

  return (
    <Paper elevation={0} className={classes.header}>
      <Typography className={classes.subtitle} variant="subtitle1">
        {humanReadableDate}
      </Typography>
      <Typography className={classes.title} variant="h3">
        {title}
      </Typography>
      <Typography className={classes.subtitle} variant="subtitle1">
        {loc}
      </Typography>
    </Paper>
  );
};

export default connect()(ItemHeader);
