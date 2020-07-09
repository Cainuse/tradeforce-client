import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

import { unsetUser } from "../../../../redux/actions/userActions";
import {
  openPostingModal,
  openLoginModal,
} from "../../../../redux/actions/modalActions";
import AccountBtn from "./AccountBtn";

const loggedOutStyles = makeStyles(() => ({
  loginBtn: {
    fontSize: "1.2rem",
    fontWeight: "100",
    textTransform: "lowercase",
  },
}));

const loggedInStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  divider: {
    display: "inline-block",
    height: "25px",
    width: "10px",
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    borderLeft: "1px solid white",
  },
  postItem: {
    textTransform: "lowercase",
    fontSize: "1.3rem",
    fontWeight: "100",
  },
  notificationBtn: {
    fontSize: "1.7rem",
    padding: "5px",
  },
  accountBtn: {
    fontSize: "2rem",
    padding: "5px",
  },
  iconBtn: {
    padding: "1px",
  },
}));

//=================================================================================================================//

/**
 * HELPERS: for Logged Out Action Items & Components
 **/

const AppBarDivider = (props) => {
  return <div className={props.className}> </div>;
};

const PostItemBtn = (props) => {
  return (
    <Button
      color="inherit"
      className={props.className}
      startIcon={<AddCircleOutlineOutlinedIcon />}
      onClick={() => props.openPostingModal()}
    >
      post an item
    </Button>
  );
};

const LoginBtn = (props) => {
  const classes = loggedOutStyles();
  return (
    <Button
      type="button"
      color="inherit"
      className={classes.loginBtn}
      onClick={() => props.openLoginModal()}
    >
      Login/Register
    </Button>
  );
};

const NotificationBtn = (props) => {
  return (
    <IconButton
      className={props.iconBtnClass}
      color="inherit"
      aria-label="chat"
    >
      <NotificationsNoneOutlinedIcon className={props.notificationBtnClass} />
    </IconButton>
  );
};

/**
 * MAIN: Logged Out Action Item Components
 **/

const LoggedInActionItems = (props) => {
  const classes = loggedInStyles();

  return (
    <div className={classes.root}>
      <PostItemBtn
        className={classes.postItem}
        openPostingModal={props.openPostingModal}
      />
      <AppBarDivider className={classes.divider} />
      <NotificationBtn
        iconBtnClass={classes.iconBtn}
        notificationBtnClass={classes.notificationBtn}
      />
      {/*<MenuListComposition />*/}
      <AccountBtn
        iconBtnClass={classes.iconBtn}
        accountBtnClass={classes.accountBtn}
      />
      {/*<SimpleMenu />*/}
    </div>
  );
};

const ActionItems = (props) => {
  if (props.isLoggedIn) {
    return <LoggedInActionItems openPostingModal={props.openPostingModal} />;
  }
  return <LoginBtn openLoginModal={props.openLoginModal} />;
};

export default connect(null, {
  openPostingModal,
  openLoginModal,
  unsetUser,
})(ActionItems);
