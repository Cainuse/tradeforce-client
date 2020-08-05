import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

import { loadPostingsByQuery } from "../../redux/actions/postingActions";
import ItemPreviewList from "../Item/ItemPreviewList";
import SearchBar from "../Item/SearchBar";
import { displayError } from "../../redux/actions/snackbarActions";
import { GENERIC_LOADING_ERROR } from "../../redux/constants/snackbarMessageTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  search: {
    margin: theme.spacing(7, 0, 3, 0),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentsContainer: {
    display: "inline-grid",
    width: "100%",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
}));

// this is the page with all the item previews displayed
// (also includes the result to searching for a specific item)
export const ItemResults = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  let location = useLocation();
  let history = useHistory();

  let postings = useSelector((state) => state.postings);
  let loading = useSelector((state) => state.loading);

  const [searchParams, setSearchParams] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(-1);

  const [postingPreviews, setPostingPreviews] = useState([]);
  const [totalNumPages, setTotalNumPages] = useState(-1);
  const [numResults, setNumResults] = useState(-1);
  const [isPostingInfoLoaded, setIsPostingInfoLoaded] = useState(false);

  // memoized function to prevent useEffect from forcing rerender every time this function is created.
  // helps prevent infinite loops
  const getSearchParamsAndPageNum = useCallback(() => {
    let paramsStr = location.search;
    let params = paramsStr.split("/");
    let searchParams = params[0].replace("?", "");

    let hasPageParam = !!params[1];

    let pageParam;
    if (!hasPageParam) {
      pageParam = 1;
    } else {
      pageParam = parseInt(params[1]);
    }

    return { searchParams, pageParam };
  }, [location]);

  useEffect(() => {
    async function getPostings() {
      try {
        resetPostingInfo();

        let { searchParams, pageParam } = getSearchParamsAndPageNum();
        setSearchParams(searchParams);
        setCurrentPageNum(parseInt(pageParam));

        await dispatch(
          loadPostingsByQuery({
            query: searchParams,
            pageNumToLoad: pageParam,
          })
        );
      } catch (err) {
        dispatch(displayError(GENERIC_LOADING_ERROR));
      }
    }
    getPostings();
  }, [dispatch, getSearchParamsAndPageNum]);

  // rerender when postings is updated in redux store
  useEffect(() => {
    let { numPages, numResults, postingPreviews } = postings;

    if (numPages && numResults && postingPreviews) {
      setTotalNumPages(numPages);
      setNumResults(numResults);
      setPostingPreviews(postingPreviews);
      setIsPostingInfoLoaded(true);
    }
  }, [postings]);

  const handlePaginationClick = (event, value) => {
    history.push(`/items/?${searchParams}/${value}`);
  };

  const resetPostingInfo = () => {
    setIsPostingInfoLoaded(false);
    setTotalNumPages(null);
    setNumResults(null);
    setPostingPreviews(null);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.search}>
        <SearchBar />
      </div>
      {isPostingInfoLoaded && numResults > 0 ? (
        <div className={classes.contentsContainer}>
          <ItemPreviewList items={postingPreviews} sizing={3} />
          <div className={classes.paginationContainer}>
            <Pagination
              count={totalNumPages}
              page={currentPageNum}
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
