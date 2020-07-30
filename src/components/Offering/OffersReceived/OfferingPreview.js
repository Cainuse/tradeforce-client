import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
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
import AcceptIconButton from "./AcceptIconButton";
import DeclineIconButton from "./DeclineIconButton";
import { getUserByIdAsync } from "../../../redux/actions/userActions";
import { openOfferDetailsModal } from "../../../redux/actions/modalActions";

const useStyles = makeStyles(() => ({
  cardRoot: {
    minWidth: "300px",
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

export const OfferingPreview = (props) => {
  const dispatch = useDispatch();
  let classes = useStyles();

  let { offer, fns, activePosting } = props;
  let { offeredItems } = offer;

  const [offerer, setOfferer] = useState({});

  let offerInfo = {
    offerId: offer._id,
    offerer: offerer,
    posting: activePosting,
  };

  let defaultImg = require("../../../images/default.jpg");
  let previewImg;

  useEffect(() => {
    let source = Axios.CancelToken.source();
    let cancelToken = { cancelToken: source.token };

    async function getOfferer() {
      try {
        let user = await dispatch(getUserByIdAsync(offer.userId, cancelToken));
        setOfferer(user);
      } catch (e) {
        if (Axios.isCancel(e)) {
          //do nothing
        } else {
          console.log(e);
        }
      }
    }

    getOfferer();

    return () => {
      source.cancel("component Offering Preview was dismounted");
    };
  }, [dispatch, offer.userId]);

  const handleClickDetails = (contentInfo) => {
    dispatch(openOfferDetailsModal(contentInfo));
  };

  //set previewImage
  if (offeredItems.length > 0) {
    let firstItem = offeredItems[0];
    previewImg = firstItem.images.length > 0 ? firstItem.images[0] : defaultImg;
  } else {
    previewImg = defaultImg;
  }

  //set contentInfo for offeringDetailsModal
  let contentInfo = {
    offeringInfo: {
      offer,
      offerer,
    },
    postingInfo: activePosting,
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
              offerer.profilePic ? offerer.profilePic : defaultProfile
            }
          />
        }
        title={`${offerer.userName}`}
        subheader={`has made you an offer of ${offeredItems.length} items`}
      />
      <CardMedia
        className={classes.previewImg}
        image={previewImg}
        title="Tradeforce"
      />

      <CardContent className={classes.cardContentRoot}>
        <CardActions>
          <Grid container item xs={12} justify={"space-between"}>
            <Grid container item xs={4} alignContent={"center"}>
              <Button onClick={() => handleClickDetails(contentInfo)}>
                Details
              </Button>
            </Grid>
            <Grid container item xs={8} justify={"flex-end"}>
              <Grid container item xs={4} justify={"flex-end"}>
                <AcceptIconButton
                  fns={fns}
                  offerInfo={offerInfo}
                  offerer={offerer}
                  posting={activePosting}
                />
              </Grid>
              <Grid container item xs={4} justify={"flex-end"}>
                <DeclineIconButton fns={fns} offerInfo={offerInfo} />
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
};
