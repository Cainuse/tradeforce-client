import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Divider } from "@material-ui/core";

import ReviewSection from "../Item/ReviewSection";
import ItemDetailContainer from "../Item/ItemDetailContainer";
import { loadItemDetail } from "../../redux/actions/postingActions";
import MessageButton from "../Item/MessageButton";

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
      const itemId = location.pathname.split("=")[1];
      let response = await dispatch(loadItemDetail(itemId));
      if (response.type === "error") {
        history.push("/OhNo!");
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
