import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import ReviewSection from "./ReviewSection";
import ItemDetailContainer from "./ItemDetailContainer";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

// Item Details page for in-depth view of offered items

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
  },
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function ItemPage(props) {
  let { itemDetail } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const pathItems = location.pathname.split("/");
  // const parentPath = location.pathname.substring(
  //   0,
  //   location.pathname.lastIndexOf("/")
  // );
  const parentPath = "/" + pathItems[1];

  const redirect = () => {
    history.push(parentPath + "/" + location.search);
  };

  const editPosting = () => {
    history.push(parentPath + "/" + pathItems[2] + "/edit");
  };

  return (
    <div>
      <div className={classes.buttonHeader}>
        <Button onClick={redirect}>&lt; Back to Search</Button>
        <Button onClick={editPosting}>Edit</Button>
      </div>
      <Container className={classes.root}>
        <ItemDetailContainer itemDetail={itemDetail} />
        <Divider className={classes.divider} />
        <ReviewSection itemDetail={itemDetail} />
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    itemDetail: state.itemDetail,
  };
};

export default connect(mapStateToProps)(ItemPage);
