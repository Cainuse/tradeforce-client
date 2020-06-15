import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import UserAvatar from "./UserAvatar";
import Grid from "@material-ui/core/Grid";
import tomato from "../../images/tomato.jpg";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "25rem",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  fullWidth: {
    width: "100%",
  },
}));

export default function ProfileCard({ userName }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} className={classes.fullWidth}>
          <CardContent>
            <div>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <UserAvatar isLargeAvatar={true} userProfileImgSrc={tomato} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h2">
                    {userName}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Divider />
            <div>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <Typography variant="h5" component="h2">
                    {userName}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.fullWidth}>
        <CardActions>
          <Button size="small">Edit Info</Button>
        </CardActions>
      </Grid>
    </Card>
  );
}
