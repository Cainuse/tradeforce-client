import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Divider } from "@material-ui/core";

import ReviewSection from "./ReviewSection";
import ItemDetailContainer from "./ItemDetailContainer";
import { loadItemDetail } from "../../redux/actions/postingActions";
import MessageButton from "./MessageButton";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
  },
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

// Item Details page for in-depth view of offered items

const ItemPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const itemDetail = useSelector((state) => state.itemDetail);
  const currentUser = useSelector((state) => state.currentUser.user);

  let isNotOwnerOfPosting =
    currentUser && currentUser._id !== itemDetail.ownerId;

  useEffect(() => {
    async function loadPosting() {
      try {
        const itemId = location.pathname.split("=")[1];
        let response = await dispatch(loadItemDetail(itemId));
        if (response === "error") {
          history.push("/OhNo!");
        }
      } catch (error) {
        console.log("Posting failed to load on ItemDetail's Page");
      }
    }

    loadPosting();
  }, [dispatch, history, location]);

  const redirect = async () => {
    history.goBack();
  };

  return Object.keys(itemDetail).length !== 0 ? (
    <div>
      <div className={classes.buttonHeader}>
        <Button onClick={redirect}>&lt; Back</Button>
      </div>
      <Container className={classes.root}>
        <ItemDetailContainer itemDetail={itemDetail} />
        <Divider className={classes.divider} />
        <ReviewSection itemDetail={itemDetail} />
        {isNotOwnerOfPosting ? (
          <MessageButton ownerId={itemDetail.ownerId} />
        ) : null}
      </Container>
    </div>
  ) : null;
};

export default ItemPage;
