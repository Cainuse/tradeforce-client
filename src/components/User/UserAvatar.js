import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function UserAvatar({
  overRideClass,
  isLargeAvatar,
  userProfileImgSrc,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="User Image"
        src={userProfileImgSrc}
        className={
          overRideClass === undefined
            ? isLargeAvatar
              ? classes.large
              : classes.small
            : overRideClass
        }
        variant={"circle"}
      />
    </div>
  );
}
