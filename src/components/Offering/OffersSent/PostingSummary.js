import React from "react";
import { Grid, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";



let useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    position: "relative"
  },
  tabsRoot: {
    marginBottom: "30px",
    outline: "display"
  },
  modalHeader: {
    paddingBottom: "10px"
  },
  submitBtn: {
    backgroundColor: "#6ab547"
  },
  declineBtn: {
    backgroundColor: "#b90202",
    color: "white",
    "&:hover": {
      backgroundColor: "#a00202"
    }
  },
  postingPreviewImg: {
    width: "200px",
  }
}));

export const PostingSummary = (props) => {
  const classes = useStyles();
  let { postingInfo } = props;
  let { postingOwner, posting } = postingInfo;
  console.log(posting);
  let { images } = posting;

  let previewImg =
    images.length > 0 && images[0] ? images[0] : require("../../../images/default.jpg");

  return (
    <Grid container item xs={12} spacing={1}>
      <Grid
        container
        item
        xs={12}
        alignContent={"center"}
        className={classes.infoContainer}
      >
        <Grid container item xs={12} alignContent={"center"}>
          <Grid container item xs={1}>
            <Avatar variant={"square"} src={previewImg} className={classes.postingPreviewImg}/>
          </Grid>

          {/*<Grid container item xs={11} className={classes.userInfoContainer}>*/}
          {/*  <Grid container item xs={12}>*/}
          {/*    <Typography*/}
          {/*      className={classes.userInfo}*/}
          {/*      style={{ marginRight: "4px" }}*/}
          {/*    >*/}
          {/*      {offerer.userName}*/}
          {/*    </Typography>*/}
          {/*    <Typography className={classes.text}>*/}
          {/*      has made an offer on your posting &quot;{postingInfo.title}*/}
          {/*      &quot;.*/}
          {/*    </Typography>*/}
          {/*  </Grid>*/}
          {/*  <Grid container item xs={12} alignContent={"center"}>*/}
          {/*    <Typography style={{ marginRight: "4px" }}>*/}
          {/*      You can contact them at*/}
          {/*    </Typography>*/}
          {/*    <Typography*/}
          {/*      className={classes.userInfo}*/}
          {/*      style={{ color: "#1D588F" }}*/}
          {/*    >*/}
          {/*      {offerer.email}*/}
          {/*    </Typography>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </Grid>
      </Grid>
    </Grid>
  );
};