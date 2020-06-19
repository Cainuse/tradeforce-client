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
import { useHistory, useRouteMatch } from "react-router-dom";
import { loadItemDetail } from "../../redux/actions/postingActions";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  tradeItemCard: {
    maxWidth: "25rem",
  },
  tradeItemCardImg: {
    height: "10rem",
  },
}));

const ItemPreview = ({
  id,
  title,
  datePosted,
  location,
  images,
  postings,
  loadItemDetail,
}) => {
  const history = useHistory();
  let { path } = useRouteMatch();
  const classes = useStyles();

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
    loadItemDetail(itemId, postings);
    history.push({
      pathname: path + "/item=" + itemId,
      search: "items",
    });
  };

  return (
    <Card className={classes.tradeItemCard}>
      <CardActionArea onClick={() => routeToItem(id)}>
        <CardMedia
          className={classes.tradeItemCardImg}
          image={
            images.length > 0
              ? require(`../../images/${images[0].name}`)
              : require(`../../images/default.jpg`)
          }
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
                {location}
              </Typography>
            </Grid>
            <Grid item align="center" xs={4}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Rating isReadOnly={true} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => routeToItem(id)}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default connect(null, { loadItemDetail })(ItemPreview);
