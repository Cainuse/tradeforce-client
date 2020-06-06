import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Image from "../images/tomato.jpg";

const useStyles = () => ({
  card: {
    backgroundColor: "clear",
    width: "10ch",
    height: "10ch",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "centre",
  },
});

class CategoryCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Paper elevation={0} className={classes.card}>
          <img src={Image} alt="Tomato" className={classes.image} />
        </Paper>
        <h5>Hobbies</h5>
      </div>
    );
  }
}

export default withStyles(useStyles)(CategoryCard);
