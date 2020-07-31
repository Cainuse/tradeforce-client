import React, { useState, useEffect, useRef } from "react";
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
    display: "inline-grid",
    width: "100%",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
    paddingBottom: "30px"
  }
}));

// this is the page with all the item previews displayed
// (also includes the result to searching for a specific item)
export const ItemResultsHook = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  let isInitialMount = useRef(true);

  let location = useLocation();
  let history = useHistory();

  let postings = useSelector((state) => state.postings);
  let loading = useSelector((state) => state.loading);

  const [searchParams, setSearchParams] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const [postingPreviews, setPostingPreviews] = useState([]);
  const [totalNumPages, setTotalNumPages] = useState(-1);

  useEffect(() => {
    async function getPostings() {
      try {
        if (isInitialMount.current) {
          setSearchParamsAndPageNum();
          isInitialMount.current = false;
        } else {
          history.push(`/items/?${searchParams}/${pageNum}`);
        }
        await dispatch(loadPostingsByQuery({
          query: searchParams,
          pageNumToLoad: pageNum
        }));
      } catch (err) {
        console.log(err);
      }
    }
    getPostings();
  }, [pageNum]);


  useEffect(() => {
    let { numPages, numResults, postingPreviews } = postings;

    if ( numPages && numResults && postingPreviews ) {
      setTotalNumPages(numPages);
      setPostingPreviews(postingPreviews);
    }

  }, [postings]);

  const handlePaginationClick = (event, value) => {
    setPageNum(value);
  }

  const setSearchParamsAndPageNum = () => {
    let paramsStr = location.search;
    let params = paramsStr.split("/");
    let searchParams = params[0].replace("?", "");
    setSearchParams(searchParams);

    let hasPageParam = !!params[1];

    if (!hasPageParam) {
      setPageNum(1);
    } else {
      setPageNum(params[1]);
    }
  }

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



