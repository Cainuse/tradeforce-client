import React, { useEffect, useState } from "react";
import { getUserByIdAysnc } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { Card, CardActionArea, CardHeader, CardMedia, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserAvatar from "../User/UserAvatar";
import defaultProfile from "../../images/placeholder-profile.png";

const useStyles = makeStyles(() => ({
  cardRoot: {
    maxWidth: "350px"
  },
  previewImg: {
    height: "0",
    paddingTop: "56.25%",
  },
}));
export const OfferingPreview = (props) => {
  const dispatch = useDispatch();
  const [offerer, setOfferer] = useState({});
  let classes = useStyles();
  let { offer, index } = props;
  let { offeredItems } = offer;
  let defaultImg = require("../../images/default.jpg")
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
      <CardActions disableSpacing>
        <CardHeader
          avatar={
            <UserAvatar
              isLargeAvatar={false}
              userProfileImgSrc={
                offerer.profilePic ? offerer.profilePic : defaultProfile
              }
            />
          }
          title={`${offerer.userName}`}
          subheader={"has made you an offer"}
        />
      </CardActions>
      <CardMedia
        className={classes.previewImg}
        image={previewImg}
        title="Tradeforce"
      />

    </Card>
  );

  // return( <img src={offerPreviewImgSrc} alt={"test"}/>)
};



