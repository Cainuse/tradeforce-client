import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "./UserAvatar";
import shellstrop from "../../images/shellstrop.jpg";

const useStyles = makeStyles((theme) => ({
  profile: {
    fontFamily: "Montserrat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(5),
  },
  username: {
    fontSize: "1.2rem",
    fontWeight: 400,
  },
}));

const ProfileCard = (props) => {
  let { currentUser } = props;
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <UserAvatar isLargeAvatar={true} userProfileImgSrc={shellstrop} />
      <Typography className={classes.name}>
        {currentUser.user.userName}
      </Typography>
    </div>
  );
};

export default connect()(ProfileCard);
