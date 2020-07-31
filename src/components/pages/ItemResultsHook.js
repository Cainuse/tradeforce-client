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
import Axios from "axios";
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

  let postings = useSelector((state) => state.postings);
  let loading = useSelector((state) => state.loading);

  const [pageNum, setPageNum] = useState(1);
  const [postingsInfo, setPostingsInfo] = useState({});

  const [postingPreviews, setPostingPreviews] = useState([]);
  const [totalNumPages, setTotalNumPages] = useState(-1);
  const [numResults, setNumResults] = useState(-1);

  //
  // useEffect(() => {
  //   let source = Axios.CancelToken.source();
  //   let cancelToken = { cancelToken: source.token };
  //
  //   async function getPostingInfo() {
  //     try {
  //       let posting = await dispatch(
  //         getPostingByIdAsync(offer.postingId, cancelToken)
  //       );
  //       let postingOwner = await dispatch(
  //         getUserByIdAsync(posting.ownerId, cancelToken)
  //       );
  //       setPosting(posting);
  //       setPostingOwner(postingOwner);
  //       setIsInfoLoaded(true);
  //       return posting;
  //     } catch (e) {
  //       if (Axios.isCancel(e)) {
  //         //do nothing
  //       } else {
  //         console.log(e);
  //       }
  //     }
  //   }


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

  // useEffect(async () => {
  //   let val = location.search.replace("?", "");
  //   await dispatch(loadPostingsByQuery({ query: val, pageNumToLoad: pageNum }));
  // }, [pageNum]);

  useEffect(() => {
    let { numPages, numResults, postingPreviews } = postings;

    if ( numPages && numResults && postingPreviews ) {
      setTotalNumPages(numPages);
      setNumResults(numResults);
      setPostingPreviews(postingPreviews);
    }

  }, [postings])


  const handleChangePagination = (event, value) => {
    this.setState({ currentPageNum: value });
  };

  console.log(postingPreviews.length);

  return (
    <Container className={classes.root}>
      <div className={classes.search}>
        <SearchBar/>
      </div>
      {postingPreviews.length > 0 ? (
        <div className={classes.contentsContainer}>
          <ItemPreviewList items={postingPreviews} sizing={3}/>
          <div className={classes.paginationContainer}>
            <Pagination count={2}
                        color={"primary"}
                        showFirstButton={true}
                        showLastButton={true}
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



