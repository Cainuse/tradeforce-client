import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import ReviewSection from "./ReviewSection";
import ItemDetailContainer from "./ItemDetailContainer";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

// Item Details page for in-depth view of offered items

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

// TODO: decide how to load the item details with routing
function ItemPage(props) {
  let { /* itemDetail, */ postings } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const parentPath = location.pathname.substring(
    0,
    location.pathname.lastIndexOf("/")
  );
  // you can use the hook useParams to get the id of the specific item to be shown
  const id = parseInt(useParams().id);
  const item = _.find(postings, { id: id });

  const redirect = () => {
    history.push(parentPath + "/" + location.search);
  };

  return (
    <div>
      <div className={classes.root}>
        <Button onClick={redirect}>&lt; Back to Search</Button>
      </div>
      <Container className={classes.root}>
        <ItemDetailContainer itemDetail={item} />
        <Divider className={classes.divider} />
        <ReviewSection itemDetail={item} />
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    itemDetail: state.itemDetail,
    postings: state.postings,
  };
};

export default connect(mapStateToProps)(ItemPage);
