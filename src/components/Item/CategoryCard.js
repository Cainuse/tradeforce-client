import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { loadPostingsByCategory } from "../../redux/actions/postingActions";
import _ from "lodash";

const useStyles = () => ({
  card: {
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
  redirect = async () => {
    let category = _.toLower(this.props.imageName);
    await this.props.loadPostingsByCategory(category);
    this.props.history.push("/items");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper
          elevation={0}
          className={classes.card}
          onClick={() => this.redirect()}
        >
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

export default connect(null, { loadPostingsByCategory })(
  withRouter(withStyles(useStyles)(CategoryCard))
);
