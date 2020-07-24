import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "@material-ui/core";
import {
  Button,
  IconButton,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import UserAvatar from "../../User/UserAvatar";
import defaultProfile from "../../../images/placeholder-profile.png";
import { openOfferDetailsModal } from "../../../redux/actions/modalActions";
import { getPostingByIdAsync } from "../../../redux/actions/postingActions";
import { getUserByIdAsync } from "../../../redux/actions/userActions";
import RescindIconButton from "./RescindIconButton";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    width: "280px"
  },
  cardContentRoot: {
    "&:last-child": {
      paddingBottom: "10px"
    }
  },
  offerHeader: {
    "& .MuiCardHeader-avatar": {
      marginRight: "10px"
    }
  },
  avatar: {
    marginRight: "10px"
  },
  previewImg: {
    height: "0",
    paddingTop: "56.25%"
  },
  statusLabel: {
    fontWeight: 500,
    color: theme.palette.primary.main,
    paddingRight: "4px"
  },
  statusInfo: {
    textTransform: "lowercase"
  }
}));

export const OfferSentPreviewCard = (props) => {
  const dispatch = useDispatch();
  let classes = useStyles();

  let { offer, currentUser, fns } = props;
  let { offeredItems } = offer;

  let [posting, setPosting] = useState({});
  let [postingOwner, setPostingOwner] = useState({});

  let defaultImg = require("../../../images/default.jpg");
  let previewImg;

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
          //do nothing
        } else {
          console.log(e);
        }
      }
    }

    getPostingInfo();

    return () => {
      source.cancel("component OfferingSentPreview was dismounted");
    };
  }, [dispatch, offer.postingId]);


  //set previewImage
  if (offeredItems.length > 0) {
    let firstItem = offeredItems[0];
    previewImg = firstItem.images.length > 0 ? firstItem.images[0] : defaultImg;
  } else {
    previewImg = defaultImg;
  }

  /**
   * set offerInfo
   *
   * offerInfo: { offerId, posting, postingOwner }
   *
   **/
  let offerInfo = {
    offerId: offer._id,
    posting,
    postingOwner,
  }

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

      <CardMedia
        className={classes.previewImg}
        image={previewImg}
        title="Tradeforce"
      />

      <CardContent className={classes.cardContentRoot}>

        <Grid container item xs={12} style={{ paddingLeft: "16px" }}>
          <Typography className={classes.statusLabel}>Status:</Typography>
          <Typography className={classes.statusInfo}>{offer.status}</Typography>
        </Grid>


        <CardActions>
          <Grid container item xs={12} justify={"space-between"}>
            <Grid container item xs={6} alignContent={"center"}>
              <Button onClick={null}>
                Details
              </Button>
            </Grid>
            <Grid container item xs={6} justify={"flex-end"}>
              {/*<IconButton onClick={null}>*/}
              {/*  <RotateLeftIcon className={classes.rescindIcon}/>*/}
              {/*</IconButton>*/}
              <RescindIconButton
                offerInfo={offerInfo}
                fns={fns}
              />
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
};
