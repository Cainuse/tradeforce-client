import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  card: {
    display: "flex",
    width: "10ch",
    height: "10ch",
    alignItems: "center",
    flexDirection: "column"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
  }
});

class CategoryCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Paper elevation={0} className={classes.card}>
          <img src={this.props.image} alt={this.props.imageName} className={classes.image} />
          <h4>{this.props.imageName}</h4>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(CategoryCard);
