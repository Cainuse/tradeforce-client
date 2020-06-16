import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
  card: {
    position: "relative",
    display: "flex",
    width: "10vw",
    height: "10vw",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "100%",
  },
  categoryName: {
    marginTop: "-1%",
    fontWeight: "normal",
  },
});

class CategoryCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Paper elevation={0} className={classes.card}>
          <img
            src={this.props.image}
            alt={this.props.imageName}
            className={classes.image}
          />
          <h1 className={classes.categoryName}>{this.props.imageName}</h1>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(CategoryCard);
