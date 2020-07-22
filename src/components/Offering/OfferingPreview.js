import React, { useEffect, useState } from "react";
import { getUserByIdAysnc } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from "@material-ui/core";
import { Link, Button, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserAvatar from "../User/UserAvatar";
import defaultProfile from "../../images/placeholder-profile.png";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';import CancelIcon from '@material-ui/icons/Cancel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AcceptIconButton from "./AcceptIconButton";
import { HoverPopoverHOC } from "../HigherOrderComponents/HoverPopoverHOC";
import DeclineIconButton from "./DeclineIconButton";

const useStyles = makeStyles((theme) => ({
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
  let { offer, index, fns } = props;
  let { offeredItems } = offer;
  let defaultImg = require("../../images/default.jpg");
  let previewImg;


  useEffect(() => {
    let mounted = true;

    async function getOfferer() {
      let user = await dispatch(getUserByIdAysnc(offer.userId));
      if (mounted) {
        setOfferer(user);
        return user;
      }
    }
    getOfferer();

    return () => {
      mounted = false;
    }
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
            <Grid container item xs={4} alignContent={"center"}>
              <Button >
                Details
              </Button>
            </Grid>
            <Grid container item xs={8} justify={"flex-end"}>
              <Grid container item xs={4} justify={"flex-end"} >
                <AcceptIconButton fns={fns}/>
              </Grid>
              <Grid container item xs={4} justify={"flex-end"}>
                <DeclineIconButton fns={fns}/>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );

};



