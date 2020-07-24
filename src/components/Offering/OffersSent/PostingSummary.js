import React from "react";
import { Grid, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";


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
    width: "300px",
    height: "100%"
  },
  sectionTitle: {
    fontWeight: "300",
    fontSize: "1.3rem",
    paddingBottom: "16px",
    paddingTop: "16px",
  },
  staticTitle: {
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    fontWeight: 500
  }
}));

export const PostingSummary = (props) => {
  const classes = useStyles();
  let { postingInfo } = props;
  let { postingOwner, posting } = postingInfo;
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

        <Grid container item xs={12} justify={"center"}>
          <Typography className={classes.sectionTitle}>Posting Summary:</Typography>
        </Grid>

        <Grid container item xs={12} alignContent={"center"}>
          <Grid container item xs={5} >
            <Avatar variant={"square"} src={previewImg} className={classes.postingPreviewImg}/>
          </Grid>

          <Grid container item xs={7} className={classes.userInfoContainer} alignContent={"center"}>
            <Grid container item xs={12}>

              <Grid container item xs={4}>
                <Typography
                  className={classes.staticTitle}
                  style={{ marginRight: "4px" }}
                >
                  Title:
                </Typography>
              </Grid>
              <Grid container item xs={8}>
                <Typography>
                  {posting.title}
                </Typography>
              </Grid>

              <Grid container item xs={4}>
                <Typography
                  className={classes.staticTitle}
                  style={{ marginRight: "4px" }}
                >
                  Owner:
                </Typography>
              </Grid>
              <Grid container item xs={8}>
                <Typography>
                  {postingOwner.userName}
                </Typography>
              </Grid>


              <Grid container item xs={4}>
                <Typography
                  className={classes.staticTitle}
                  style={{ marginRight: "4px" }}
                >
                  Date:
                </Typography>
              </Grid>
              <Grid container item xs={8}>
                <Typography>
                  {moment(posting.date).format("MMMM Do YYYY")}
                </Typography>
              </Grid>

              <Grid container item xs={4}>
                <Typography
                  className={classes.staticTitle}
                  style={{ marginRight: "4px" }}
                >
                  Qty:
                </Typography>
              </Grid>
              <Grid container item xs={8}>
                <Typography>
                  {posting.quantity}
                </Typography>
              </Grid>

              <Grid container item xs={4}>
                <Typography
                  className={classes.staticTitle}
                  style={{ marginRight: "4px" }}
                >
                  Condition:
                </Typography>
              </Grid>
              <Grid container item xs={8}>
                <Typography>
                  {posting.condition}
                </Typography>
              </Grid>

              <Grid container item xs={4}>
                <Typography
                  className={classes.staticTitle}
                  style={{ marginRight: "4px" }}
                >
                  Description:
                </Typography>
              </Grid>
              <Grid container item xs={8}>
                <Typography>
                  {posting.description}
                </Typography>
              </Grid>

            </Grid>


          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};