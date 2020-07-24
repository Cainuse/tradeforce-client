import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import UserAvatar from "../../User/UserAvatar";
import defaultProfile from "../../../images/placeholder-profile.png";
import AcceptIconButton from "../OffersReceived/AcceptIconButton";
import DeclineIconButton from "../OffersReceived/DeclineIconButton";
import { openOfferDetailsModal } from "../../../redux/actions/modalActions";
import { getPostingByIdAsync } from "../../../redux/actions/postingActions";
import { getUserByIdAsync } from "../../../redux/actions/userActions";

const useStyles = makeStyles(() => ({
  cardRoot: {
    width: "280px",
  },
  cardContentRoot: {
    "&:last-child": {
      paddingBottom: "16px",
    },
  },
  offerHeader: {
    "& .MuiCardHeader-avatar": {
      marginRight: "10px",
    },
  },
  avatar: {
    marginRight: "10px",
  },
  previewImg: {
    height: "0",
    paddingTop: "56.25%",
  },
}));

export const OfferSentPreviewCard = (props) => {
  const dispatch = useDispatch();
  let classes = useStyles();

  let { offer, currentUser } = props;

  let [posting, setPosting] = useState({});
  let [postingOwner, setPostingOwner] = useState({});

  useEffect(() => {
    let source = Axios.CancelToken.source();
    let cancelToken = { cancelToken: source.token };

    async function getPostingInfo() {
      try {
        let posting = await dispatch(
          getPostingByIdAsync(offer.postingId, cancelToken)
        );
        let postingOwner = await dispatch(
          getUserByIdAsync(posting.ownerId, cancelToken)
        );
        setPosting(posting);
        setPostingOwner(postingOwner);
        return posting;
      } catch (e) {
        if (Axios.isCancel(e)) {
          console.log("caught Axios cancel");
        } else {
          console.log(e);
        }
      }
    }

    getPostingInfo();

    return () => {
      source.cancel();
    };
  }, [dispatch, offer.postingId]);

  const handleClickDetails = (contentInfo) => {
    dispatch(openOfferDetailsModal(contentInfo));
  };

  return (
    <Card elevation={2} className={classes.cardRoot}>
      <CardHeader
        className={classes.offerHeader}
        avatar={
          <UserAvatar
            className={classes.avatar}
            isLargeAvatar={false}
            userProfileImgSrc={
              currentUser.profilePic ? currentUser.profilePic : defaultProfile
            }
          />
        }
        title={`You have made an offer on`}
        subheader={`${postingOwner.userName}'s posting "${posting.title}"`}
      />
      {/*<CardMedia*/}
      {/*  className={classes.previewImg}*/}
      {/*  image={previewImg}*/}
      {/*  title="Tradeforce"*/}
      {/*/>*/}

      {/*<CardContent className={classes.cardContentRoot}>*/}
      {/*  <CardActions>*/}
      {/*    <Grid container item xs={12} justify={"space-between"}>*/}
      {/*      <Grid container item xs={4} alignContent={"center"}>*/}
      {/*        <Button onClick={() => handleClickDetails(contentInfo)}>*/}
      {/*          Details*/}
      {/*        </Button>*/}
      {/*      </Grid>*/}
      {/*      <Grid container item xs={8} justify={"flex-end"}>*/}
      {/*        <Grid container item xs={4} justify={"flex-end"}>*/}
      {/*          <AcceptIconButton fns={fns} offerInfo={offerInfo}/>*/}
      {/*        </Grid>*/}
      {/*        <Grid container item xs={4} justify={"flex-end"}>*/}
      {/*          <DeclineIconButton fns={fns} offerInfo={offerInfo}/>*/}
      {/*        </Grid>*/}
      {/*      </Grid>*/}
      {/*    </Grid>*/}
      {/*  </CardActions>*/}
      {/*</CardContent>*/}
    </Card>
  );
};
