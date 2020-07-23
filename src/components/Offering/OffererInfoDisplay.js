import React from "react";
import { Grid, Typography } from "@material-ui/core";
import UserAvatar from "../User/UserAvatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  infoContainer: {
    display: "flex"
  },
  userInfoContainer: {
    paddingLeft: "10px"
  },
  userInfo: {
    alignSelf: "center",
    fontWeight: 500
  },
  text: {
    alignSelf: "center"
  }
}));

export const OffererInfoDisplay = (props) => {
  let classes = useStyles();
  let { offerer, postingInfo } = props;

  return (
    <Grid container item xs={12} spacing={1}>

      <Grid container item xs={12}
            alignContent={"center"}
            className={classes.infoContainer}
      >
        <Grid container item xs={12} alignContent={"center"}>
          <Grid container item xs={1}>
            <UserAvatar isLargeAvatar={false} userProfileImgSrc={offerer.profilePic}/>
          </Grid>

          <Grid container item xs={11} className={classes.userInfoContainer}>
            <Grid container item xs={12}>
              <Typography className={classes.userInfo} style={{ marginRight: "4px" }}>{offerer.userName}</Typography>
              <Typography className={classes.text}>has made an offer on your posting
                &quot;{postingInfo.title}&quot;.</Typography>
            </Grid>
            <Grid container item xs={12} alignContent={"center"}>
              <Typography style={{ marginRight: "4px" }}>You can contact them at</Typography>
              <Typography className={classes.userInfo} style={{ color: "#1D588F" }}>{offerer.email}</Typography>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
};