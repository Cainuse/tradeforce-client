import React, { useEffect, useState } from "react";
import { getUserByIdAysnc } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Link, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserAvatar from "../User/UserAvatar";
import defaultProfile from "../../images/placeholder-profile.png";
import AcceptIconButton from "./AcceptIconButton";
import DeclineIconButton from "./DeclineIconButton";

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

  let defaultImg = require("../../images/default.jpg");
  let previewImg;

  useEffect(() => {
    let isMounted = true;

    async function getOfferer() {
      let user = await dispatch(getUserByIdAysnc(offer.userId));
      if (isMounted) {
        setOfferer(user);
        return user;
      }
    }

    getOfferer();

    return () => {
      isMounted = false;
    };
  }, [dispatch, offer.userId]);

  //set previewImage
  if (offeredItems.length > 0) {
    let firstItem = offeredItems[0];
    previewImg = firstItem.images.length > 0 ? firstItem.images[0] : defaultImg;
  } else {
    previewImg = defaultImg;
  }

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
              <Button>Details</Button>
            </Grid>
            <Grid container item xs={8} justify={"flex-end"}>
              <Grid container item xs={4} justify={"flex-end"}>
                <AcceptIconButton fns={fns} offerInfo={offerInfo} />
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
