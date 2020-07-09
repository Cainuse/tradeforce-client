import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "./UserAvatar";
import shellstrop from "../../images/shellstrop.jpg";
import GoogleLogoutBtn from "../Login/GoogleLogoutBtn";
import LogoutBtn from "../Login/LogoutBtn";

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
  let { userDetail, currentUser } = props;
  const classes = useStyles();
  console.log(currentUser);

  return (
    <div className={classes.profile}>
      <UserAvatar isLargeAvatar={true} userProfileImgSrc={shellstrop} />
      <Typography
        className={classes.name}
      >{`${userDetail.firstName} ${userDetail.lastName}`}</Typography>
      <Typography className={classes.username}>
        {userDetail.userName}
      </Typography>
      {currentUser.user.isGoogleUser ? (
        <GoogleLogoutBtn />
      ) : (
        <LogoutBtn logout={props.logout} />
      )}
    </div>
  );
};

export default connect()(ProfileCard);
