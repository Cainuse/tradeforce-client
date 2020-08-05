import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { clearOldItemDetails } from "../../redux/actions/postingActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserByIdAsync } from "../../redux/actions/userActions";

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
  clearOldItemDetails,
  getUserByIdAsync,
  currentUser,
  item,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [distanceMsg, setDistanceMsg] = useState("");
  const [locationMsg, setLocationMsg] = useState("");
  const { _id, title, date, images, ownerId, location } = item;

  const getDistance = (lat1, lat2, lon1, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  };

  const updateDistance = async () => {
    if (location && location.lat && location.lon) {
      const dist = Math.floor(
        getDistance(
          currentUser.user.location.lat,
          location.lat,
          currentUser.user.location.lon,
          location.lon,
          "K"
        )
      );
      setDistanceMsg(`About ${dist} km away`);
      setLocationMsg(location.location);
      return dist;
    } else {
      try {
        if (ownerId) {
          let user = await getUserByIdAsync(ownerId);

          const dist = Math.floor(
            getDistance(
              currentUser.user.location.lat,
              user.location.lat,
              currentUser.user.location.lon,
              user.location.lon,
              "K"
            )
          );
          setDistanceMsg(`About ${dist} km away`);
          setLocationMsg(user.location.location);
          return dist;
        }
      } catch (err) {
        setDistanceMsg("");
        setLocationMsg("");
      }
    }
  };

  useEffect(() => {
    if (currentUser.user && currentUser.user.location) {
      updateDistance();
    }
  }, [location]);

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

  const renderLocationData = () => {
    return currentUser.user ? (
      <Grid item xs={12}>
        <Typography variant="body2" color="textPrimary" component="p">
          {distanceMsg}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {locationMsg}
        </Typography>
      </Grid>
    ) : null;
  };

  return (
    <Card className={classes.tradeItemCard} elevation={2}>
      <CardActionArea onClick={() => routeToItem(_id)}>
        <CardMedia
          className={classes.tradeItemCardImg}
          image={
            images.length > 0 && images[0]
              ? images[0]
              : require("../../images/default.jpg")
          }
          title={`Preview of ${title || "Untitled Posting"}`}
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
            {renderLocationData()}
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.bottom}>
        <Button size="small" color="primary" onClick={() => routeToItem(_id)}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {
  clearOldItemDetails,
  getUserByIdAsync,
})(ItemPreview);
