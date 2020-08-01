import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, withRouter } from "react-router";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

import ReviewSection from "./ReviewSection";
import ItemDetailContainer from "./ItemDetailContainer";
import { getPostingByIdAsync, loadItemDetail } from "../../redux/actions/postingActions";
import Axios from "axios";
import { getUserByIdAsync } from "../../redux/actions/userActions";

// Item Details page for in-depth view of offered items

const useStyles = (theme) => ({
  root: {
    fontFamily: "Montserrat"
  },
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
});

const ItemPage = ({ classes, itemDetail }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function loadPosting() {
      try {
        const itemId = location.pathname.split("=")[1];
        let response = await dispatch(loadItemDetail(itemId));
        if (response === "error") {
          history.push("/OhNo!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadPosting();
  }, [location, history, dispatch]);

  const redirect = async () => {
    history.goBack();
  };


  return Object.keys(itemDetail).length !== 0 ? (
    <div>
      <div className={classes.buttonHeader}>
        <Button onClick={redirect}>&lt; Back</Button>
      </div>
      <Container className={classes.root}>
        <ItemDetailContainer itemDetail={itemDetail}/>
        <Divider className={classes.divider}/>
        <ReviewSection itemDetail={itemDetail}/>
      </Container>
    </div>
  ) : null;

};

const mapStateToProps = (state) => ({
  itemDetail: state.itemDetail
});

export default connect(mapStateToProps, { loadItemDetail })(
  withRouter(withStyles(useStyles)(ItemPage))
);
