import React from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import SearchBar from "../Item/SearchBar";
import { withStyles } from "@material-ui/core/styles";
import { loadPostingsByQuery } from "../../redux/actions/postingActions";
import { withRouter } from "react-router";
import ItemPreviewList from "../Item/ItemPreviewList";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  search: {
    margin: theme.spacing(7, 0, 0, 1),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

// this is the page with all the item previews displayed (also includes the result to searching for a specific item)
class ItemResults extends React.Component {
  componentDidMount() {
    let val = this.props.location.search.replace("?", "");
    this.props.loadPostingsByQuery(val);
  }

  render() {
    const { classes, postings } = this.props;

    return (
      <Container className={classes.root}>
        <div className={classes.search}>
          <SearchBar />
        </div>
        <ItemPreviewList items={postings} sizing={3} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  postings: state.postings,
});

export default connect(mapStateToProps, { loadPostingsByQuery })(
  withRouter(withStyles(useStyles)(ItemResults))
);
