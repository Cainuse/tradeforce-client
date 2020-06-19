import React from "react";
import ProfileCard from "../User/ProfileCard";
import { makeStyles } from "@material-ui/core";
import hero from "../../images/hero.png";
import UserDetails from "../User/UserDetails";

const useStyles = makeStyles(() => ({
  hero: {
    position: "relative",
    height: "20vh",
    backgroundImage: "url(" + hero + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    zIndex: "-2",
    opacity: "0.7",
  },
  container: {
    width: "100%",
    zIndex: "-1",
    transform: "translateY(-85px)",
  },
  profile: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    position: "absolute",
    top: 0,
  },
  box: {},
}));

const UserProfile = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.hero}></div>
      <div className={classes.container}>
        <ProfileCard />
        <UserDetails />
      </div>
    </div>
  );
};

export default UserProfile;
