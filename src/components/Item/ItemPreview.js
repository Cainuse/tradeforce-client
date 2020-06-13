import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Rating from "./Rating";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  tradeItemCard: {
    maxWidth: "25rem",
  },
  tradeItemCardImg: {
    height: "10rem",
  },
}));

const MediaCard = ({ title, datePosted }) => {
  const history = useHistory("/");
  const classes = useStyles();

  // postedDate must be a date object
  const getDate = (postedDate) => {
    const today = new Date();
    const diffTime = Math.abs(today - postedDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return diffDays === 0
        ? "Posted today"
        : "Posted " + diffDays + " day(s) ago";
    }
    if (diffDays >= 30 && diffDays <= 365) {
      return "Posted " + Math.floor(diffDays / 30) + " month(s) ago";
    }

    return "Posted " + diffDays / 365 + " year(s) ago";
  };

  const routeToItem = (path) => {
    history.push(path);
  };

  return (
    <Card className={classes.tradeItemCard}>
      <CardActionArea onClick={() => routeToItem("testItem")}>
        <CardMedia
          className={classes.tradeItemCardImg}
          image={require("../../images/trade.jpg")}
          title="Tradeforce"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h6"
                color="textPrimary"
                component="h2"
              >
                {getDate(datePosted)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h6" component="h2">
                {title ? title : "Untitled"}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" color="textPrimary" component="p">
                Vancouver, BC
              </Typography>
            </Grid>
            <Grid item align="center" xs={4}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Rating ratingMode={true} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
