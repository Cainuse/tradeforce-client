import React, { useEffect } from "react";
import { connect } from "react-redux";
import ItemPreview from "../Item/ItemPreview";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SearchBar from "../Item/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { loadPostingsByCategory } from "../../redux/actions/postingActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  search: {
    margin: theme.spacing(7, 0),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

// this is the page with all the item previews displayed (also includes the result to searching for a specific item)
const ItemResults = ({ postings, loadPostingsByCategory }) => {
  const classes = useStyles();
  const params = useParams();
  useEffect(() => {
    let category = params.category === "all" ? "" : params.category;
    async function fetchData() {
      await loadPostingsByCategory(category);
    }
    fetchData();
  }, []);

  return (
    <Container className={classes.root}>
      <div className={classes.search}>
        <SearchBar />
      </div>
      <Grid container direction={"row"} spacing={4}>
        {postings.map((item, index) => {
          return (
            <Grid key={index} item xs={3}>
              <ItemPreview
                _id={item._id}
                title={item.title}
                date={item.date}
                location={item.location}
                images={item.images}
                postings={postings} //TODO: remove when BE implemented
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  postings: state.postings,
});

export default connect(mapStateToProps, { loadPostingsByCategory })(
  ItemResults
);
