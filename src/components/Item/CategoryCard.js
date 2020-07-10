import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  card: {
    display: "flex",
    width: "10vw",
    height: "10vw",
    alignItems: "center",
    flexDirection: "column",
    margin: theme.spacing(1),
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "100%",
  },
  categoryName: {
    fontWeight: 300,
  },
});

class CategoryCard extends Component {
  redirect = async () => {
    // let category = this.props.value === "all" ? "" : this.props.value;
    // await this.props.loadPostingsByCategory(category);
    this.props.history.push({
      pathname: "/items",
      search: `category=${this.props.value}`,
    });
  };

  render() {
    const { classes, label, value } = this.props;
    return (
      <div>
        <Paper
          elevation={0}
          className={classes.card}
          onClick={() => this.redirect()}
        >
          <img
            src={require(`../../images/categories/${value}.jpg`)}
            alt={label}
            className={classes.image}
          />
          <Typography variant="h5" className={classes.categoryName}>
            {label}
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(CategoryCard));
