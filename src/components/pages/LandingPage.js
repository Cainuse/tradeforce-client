import React from "react";
import { makeStyles } from "@material-ui/core";
import SearchBar from "../Item/SearchBar";
import CategoryList from "../Item/CategoryList";

const useStyles = makeStyles(() => ({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "300%",
    opacity: "35%",
    top: "-110%",
    zIndex: "-1",
    objectFit: "cover",
  },
  searchBar: {
    position: "absolute",
    width: "100%",
    top: "35%",
    left: "15%",
  },
  container: {
    position: "relative",
    width: "100vw",
    height: "30vh",
  },
  categoryList: {
    width: "100vw",
    minHeight: "40vw",
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <img
          src={require("../../images/community.jpg")}
          alt="Background"
          className={classes.backgroundImage}
        ></img>
        <div className={classes.searchBar}>
          <SearchBar className={classes.searchBar} />
        </div>
      </div>
      <div className={classes.categoryList}>
        <CategoryList />
      </div>
    </div>
  );
}