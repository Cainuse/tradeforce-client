import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

import { loadPostingsByQuery } from "../../redux/actions/postingActions";
import ItemPreviewList from "../Item/ItemPreviewList";
import SearchBar from "../Item/SearchBar";


const useStyles = (theme) => ({
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
    paddingBottom: "30px",
  }
});

// this is the page with all the item previews displayed (also includes the result to searching for a specific item)
class ItemResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPageNum: 1
    };
  }

  componentDidMount() {
    let val = this.props.location.search.replace("?", "");
    this.props.loadPostingsByQuery({ query: val, pageNumToLoad: 1 });
  }

  componentDidUpdate() {

  }
  
  handleChangePagination = (event, value) => {
    this.setState({ currentPageNum: value });
  }

  render() {
    const { classes, postings, loading } = this.props;

    return (
      <Container className={classes.root}>
        <div className={classes.search}>
          <SearchBar />
        </div>
        {postings.length > 0 ? (
          <div className={classes.contentsContainer}>
            <ItemPreviewList items={postings} sizing={3}/>
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
  }
}

const mapStateToProps = (state) => ({
  postings: state.postings,
  loading: state.loading,
});

export default connect(mapStateToProps, { loadPostingsByQuery })(
  withRouter(withStyles(useStyles)(ItemResults))
);
