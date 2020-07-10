import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CategoryCard from "./CategoryCard";

import { categories } from "../../redux/constants/classifierTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    position: "relative",
    flexGrow: 1,
  },
  categoriesTitle: {
    color: "#1d588f",
    paddingLeft: "10%",
    paddingTop: theme.spacing(2),
    fontStyle: "italic",
    fontWeight: "normal",
    marginTop: theme.spacing(1),
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

  return (
    <div className={classes.root}>
      <h1 className={classes.categoriesTitle}>Categories</h1>
      <Grid container className={classes.container}>
        {categories.map((category, index) => {
          if (index === 0) {
            category = { value: "all", label: "All" };
          }
          return (
            <Grid key={index} item xs={3} className={classes.categoryCards}>
              <CategoryCard label={category.label} value={category.value} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
