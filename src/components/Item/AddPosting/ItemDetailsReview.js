import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  tags: {
    margin: theme.spacing(0.5),
  },
  heading: {
    fontWeight: 300,
    fontSize: "1.2rem",
  },
  staticTitle: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  content: {
    fontWeight: 300,
  },
  gridItem: {
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
  },
}));

const ItemDetailsReview = (props) => {
  const { state } = props;
  const { title, description, category, condition, quantity, tags } = state;

  const classes = useStyles();

  return (
    <Grid container spacing={4}>
      <Grid item container sm={6} xs={12} className={classes.gridItem}>
        <Typography className={classes.staticTitle}>Title:&nbsp;</Typography>
        <Typography className={classes.content}>{title}</Typography>
      </Grid>
      <Grid item container sm={6} xs={12} className={classes.gridItem}>
        <Typography className={classes.staticTitle}>Quantity:&nbsp;</Typography>
        <Typography className={classes.content}>{quantity}</Typography>
      </Grid>
      <Grid item container xs={12} className={classes.gridItem}>
        <Typography className={classes.staticTitle}>
          Description:&nbsp;
        </Typography>
        <Typography className={classes.content}>{description}</Typography>
      </Grid>
      <Grid item container sm={6} xs={12} className={classes.gridItem}>
        <Typography className={classes.staticTitle}>Category:&nbsp;</Typography>
        <Typography className={classes.content}>{category}</Typography>
      </Grid>
      <Grid item container sm={6} xs={12} className={classes.gridItem}>
        <Typography className={classes.staticTitle}>
          Condition:&nbsp;
        </Typography>
        <Typography className={classes.content}>{condition}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.staticTitle}>Tags:&nbsp;</Typography>
        {tags.map((tag, idx) => (
          <Chip
            key={idx}
            color="primary"
            size="small"
            label={tag}
            className={classes.tags}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ItemDetailsReview;
