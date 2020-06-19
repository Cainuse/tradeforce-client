import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CategoryCard from "./CategoryCard";
import Tomato from "../../images/tomato.jpg";
import Electronics from "../../images/electronics.jpg";
import Sports from "../../images/sports.jpg";
import Hobbies from "../../images/hobbies.jpg";
import Snacks from "../../images/snacks.jpg";
import Household from "../../images/household.jpg";
import Toys from "../../images/toys.jpeg";
import Clothing from "../../images/clothing.jpeg";
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    position: "relative",
    flexGrow: 1,
  },
  categoriesTitle: {
    color: "#1d588f",
    paddingLeft: "10%",
    paddingTop: "2%",
    fontStyle: "italic",
    fontWeight: "normal",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    paddingLeft: "10%",
    textAlign: "center",
  },
  categoryCards: {
    paddingBottom: "3%",
  },
}));

export default function CategoryList() {
  const classes = useStyles();

  const Categories = [
    { image: Electronics, label: "Electronics" },
    { image: Clothing, label: "Clothing" },
    { image: Hobbies, label: "Hobbies" },
    { image: Snacks, label: "Snacks" },
    { image: Household, label: "Household" },
    { image: Sports, label: "Sports" },
    { image: Toys, label: "Toys" },
    { image: Tomato, label: "Groceries" },
  ];
  return (
    <div className={classes.root}>
      <h1 className={classes.categoriesTitle}>Categories</h1>
      <Grid container className={classes.container}>
        {Categories.map((category, index) => {
          return (
            <Grid key={index} item xs={3} className={classes.categoryCards}>

              <CategoryCard image={category.image} imageName={category.label} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
