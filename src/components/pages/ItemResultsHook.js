import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

import { getPostingByIdAsync, loadPostingsByQuery } from "../../redux/actions/postingActions";
import ItemPreviewList from "../Item/ItemPreviewList";
import SearchBar from "../Item/SearchBar";
import { getUserByIdAsync } from "../../redux/actions/userActions";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  search: {
    margin: theme.spacing(7, 0, 3, 0),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  contentsContainer: {
    display: "inline-grid"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
    paddingBottom: "30px"
  }
}));

// this is the page with all the item previews displayed (also includes the result to searching for a specific item)
export const ItemResultsHook = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  let location = useLocation();
  let history = useHistory();

  let postings = useSelector((state) => state.postings);
  let loading = useSelector((state) => state.loading);

  const [pageNum, setPageNum] = useState(1);

  const [postingPreviews, setPostingPreviews] = useState([]);
  const [totalNumPages, setTotalNumPages] = useState(-1);
  const [numResults, setNumResults] = useState(-1);

  useEffect(() => {
    async function getPostings() {
      try {
        let val = location.search.replace("?", "");
        // console.log(val);
        await dispatch(loadPostingsByQuery({ query: val, pageNumToLoad: 1 }));
      } catch (err) {
        console.log(err);
      }
    }
    getPostings();
  }, []);



  useEffect(() => {
    let { numPages, numResults, postingPreviews } = postings;

    if ( numPages && numResults && postingPreviews ) {
      setTotalNumPages(numPages);
      setNumResults(numResults);
      setPostingPreviews(postingPreviews);
    }

  }, [postings])

  const handlePaginationClick = (event, value) => {
    setPageNum(value);

    if (value > 1) {
      let val = location.search.replace("?", "");
      console.log(val);

      // let searchParamsStr = location.search;
      let searchParamsStr = "http://localhost:3000/items?category=all&page=2";
      let params = new URLSearchParams(searchParamsStr);
      console.log(params.keys());
      // let searchParams = searchParamsStr.split("&");
      // console.log(searchParams);
      // history.push();
    }
  }

  // console.log(location);

  return (
    <Container className={classes.root}>
      <div className={classes.search}>
        <SearchBar/>
      </div>
      {postingPreviews.length > 0 ? (
        <div className={classes.contentsContainer}>
          <ItemPreviewList items={postingPreviews} sizing={3}/>
          <div className={classes.paginationContainer}>
            <Pagination count={totalNumPages}
                        color={"primary"}
                        showFirstButton={true}
                        showLastButton={true}
                        onChange={handlePaginationClick}
            />
          </div>
        </div>
      ) : loading ? null : (
        <Typography className={classes.noResults}>
          No results were found
        </Typography>
      )}
    </Container>
  );
};



