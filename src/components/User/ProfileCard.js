import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "./UserAvatar";
import defaultProfile from "../../images/placeholder-profile.png";
import { displayError } from "../../redux/actions/snackbarActions";

const useStyles = makeStyles((theme) => ({
  profile: {
    fontFamily: "Montserrat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(5),
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: 400,
  },
  username: {
    fontSize: ".9rem",
    fontWeight: 300,
  },
}));

const ProfileCard = (props) => {
  let { userDetail } = props;
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <UserAvatar
        isLargeAvatar={true}
        userProfileImgSrc={
          userDetail.profilePic ? userDetail.profilePic : defaultProfile
        }
      />
      <Typography
        className={classes.name}
      >{`${userDetail.firstName} ${userDetail.lastName}`}</Typography>
      <Typography className={classes.username}>
        {userDetail.userName}
      </Typography>
    </div>
  );
};

export default connect(null, { displayError })(ProfileCard);
