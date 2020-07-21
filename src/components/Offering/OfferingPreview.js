import React, { useEffect, useState } from "react";
import { getUserByIdAysnc } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from "@material-ui/core";
import { Link, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserAvatar from "../User/UserAvatar";
import defaultProfile from "../../images/placeholder-profile.png";

const useStyles = makeStyles(() => ({
  cardRoot: {
    // maxWidth: "350px"
    minWidth: "300px",
  },
  cardContentRoot: {
    "&:last-child": {
      paddingBottom: "16px",
    },
  },
  offerHeader: {
    // padding: "10px"
    "& .MuiCardHeader-avatar": {
      marginRight: "10px",
    }
  },
  avatar: {
    marginRight: "10px",
  },
  previewImg: {
    height: "0",
    paddingTop: "56.25%"
  },
  detailsBtn: {
    // padding: "0px",
  },
}));
export const OfferingPreview = (props) => {
  const dispatch = useDispatch();
  const [offerer, setOfferer] = useState({});
  let classes = useStyles();
  let { offer, index } = props;
  let { offeredItems } = offer;
  let defaultImg = require("../../images/default.jpg");
  let previewImg;


  useEffect(() => {
    async function getOfferer() {
      let user = await dispatch(getUserByIdAysnc(offer.userId));
      setOfferer(user);
      return user;
    }

    getOfferer();
  }, [dispatch, offer.userId]);

  if (offeredItems.length > 0) {
    let firstItem = offeredItems[0];
    previewImg = firstItem.images.length > 0 ? firstItem.images[0] : defaultImg;
  } else {
    previewImg = defaultImg;
  }

  console.log(offer);

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
        title={<Link>{`${offerer.userName}`}</Link>}
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
            <Grid item xs={3}>
            <Button >
              Details
            </Button>
            </Grid>
            <Grid container item xs={9} justify={"flex-end"}>
              <Grid container item xs={4} justify={"flex-end"}>
                <Button>
                  Accept
                </Button>
              </Grid>
              <Grid container item xs={4} justify={"flex-end"}>
                <Button>
                  Decline
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>

      </CardContent>
    </Card>
  );

  // return( <img src={offerPreviewImgSrc} alt={"test"}/>)
};



