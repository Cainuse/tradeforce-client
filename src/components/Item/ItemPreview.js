import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Rating from "./Rating";
import { clearOldItemDetails } from "../../redux/actions/postingActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  tradeItemCard: {
    maxWidth: "25rem",
  },
  tradeItemCardImg: {
    height: "10rem",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ItemPreview = ({
  _id,
  title,
  date,
  location,
  images,
  clearOldItemDetails,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const parseDate = (str) => {
    return new Date(str);
  };

  const getDate = (postedDate) => {
    const today = new Date();
    const diffTime = Math.abs(today - parseDate(postedDate));
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return diffDays === 0
        ? "Posted today"
        : diffDays === 1
        ? "Posted " + diffDays + " day ago"
        : "Posted " + diffDays + " days ago";
    }
    if (diffDays >= 30 && diffDays <= 365) {
      return Math.round(diffDays / 30) === 1
        ? "Posted " + Math.round(diffDays / 30) + " month ago"
        : "Posted " + Math.round(diffDays / 30) + " months ago";
    }

    return Math.round(diffDays / 365) === 1
      ? "Posted " + Math.round(diffDays / 365) + " year ago"
      : "Posted " + Math.round(diffDays / 365) + " years ago";
  };

  const routeToItem = (itemId) => {
    clearOldItemDetails();
    history.push({
      pathname: "/items/item=" + itemId,
    });
  };

  return (
    <Card className={classes.tradeItemCard} elevation={2}>
      <CardActionArea onClick={() => routeToItem(_id)}>
        <CardMedia
          className={classes.tradeItemCardImg}
          image={
            images.length > 0 ? images[0] : require("../../images/default.jpg")
          }
          title="Tradeforce"
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2">{getDate(date)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" color="primary">
                {title ? title : "Untitled"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textPrimary" component="p">
                {location}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.bottom}>
        <Button size="small" color="primary" onClick={() => routeToItem(_id)}>
          Details
        </Button>
        <Rating isReadOnly={true} />
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, {
  clearOldItemDetails,
})(ItemPreview);
