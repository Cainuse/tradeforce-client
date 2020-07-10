import React from "react";
import { connect } from "react-redux";
import ItemPreview from "../Item/ItemPreview";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SearchBar from "../Item/SearchBar";
import { withStyles } from "@material-ui/core/styles";
import { loadPostingsByQuery } from "../../redux/actions/postingActions";
import { withRouter } from "react-router";

const useStyles = (theme) => ({
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
  }
}

const mapStateToProps = (state) => ({
  postings: state.postings,
});

export default connect(mapStateToProps, { loadPostingsByQuery })(
  withRouter(withStyles(useStyles)(ItemResults))
);
