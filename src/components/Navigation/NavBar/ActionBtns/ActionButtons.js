import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

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
  chatBtn: {
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

const LoginRegisterBtn = () => {
  const classes = loggedOutStyles();
  return (
    <Button className={classes.loginBtn} color="inherit">
      Login/Register
    </Button>
  );
};

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
    >
      post an item
    </Button>
  );
};

const ChatBtn = (props) => {
  return (
    <IconButton
      className={props.iconBtnClass}
      color="inherit"
      aria-label="chat"
    >
      <SmsOutlinedIcon className={props.chatBtnClass} />
    </IconButton>
  );
};

const AccountBtn = (props) => {
  const history = useHistory();
  return (
    <IconButton
      className={props.iconBtnClass}
      color="inherit"
      aria-label="accountButton"
      onClick={() => history.push("/profile")}
    >
      <AccountCircleOutlinedIcon className={props.accountBtnClass} />
    </IconButton>
  );
};

/**
 * MAIN: Logged Out Action Item Components
 **/

const LoggedInActionItems = () => {
  const classes = loggedInStyles();

  return (
    <div className={classes.root}>
      <PostItemBtn className={classes.postItem} />
      <AppBarDivider className={classes.divider} />
      <ChatBtn iconBtnClass={classes.iconBtn} chatBtnClass={classes.chatBtn} />
      <AccountBtn
        iconBtnClass={classes.iconBtn}
        accountBtnClass={classes.accountBtn}
      />
    </div>
  );
};

export const ActionItems = (props) => {
  if (props.isLoggedIn) {
    return <LoggedInActionItems />;
  }
  return <LoginRegisterBtn />;
};
