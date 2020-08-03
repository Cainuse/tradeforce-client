import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { logoutUser } from "../../../../redux/actions/userActions";
import GoogleLogoutBtn from "../../../Login/GoogleLogoutBtn";
import { loadUserDetails } from "../../../../redux/actions/userDetailActions";

const useStyles = makeStyles(() => ({
  accountBtnContainer: {
    paddingLeft: "5px",
  },
  accountBtn: {
    height: "30px",
    width: "30px",
  },
}));

const getLogoutMenuItem = (currentUser, handleClickLogout) => {
  if (currentUser.user.isGoogleUser) {
    return <GoogleLogoutBtn />;
  } else {
    return <MenuItem onClick={handleClickLogout}>Logout</MenuItem>;
  }
};

function AccountBtn(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickProfile = async () => {
    let response = await props.loadUserDetails({
      userId: props.currentUser.user._id,
      currentUserId: props.currentUser.user._id,
    });
    if (response === "success") {
      history.push(`/profile/user=${props.currentUser.user._id}`);
    } else {
      history.push("/UserNotFound");
    }
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    props.logoutUser(props.currentUser.user._id);
    history.push("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.accountBtnContainer}>
      <IconButton
        className={props.iconBtnClass}
        color="inherit"
        aria-label="accountButton"
        onClick={handleClick}
      >
        <Avatar
          src={props.currentUser.user.profilePic}
          variant={"circle"}
          alt={"userProfileIcon"}
          className={classes.accountBtn}
        />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
      >
        <MenuItem onClick={handleClickProfile}>My Profile</MenuItem>
        {getLogoutMenuItem(props.currentUser, handleClickLogout)}
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (userId) => dispatch(logoutUser(userId)),
  loadUserDetails: ({ userId, currentUserId }) =>
    dispatch(loadUserDetails({ userId, currentUserId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountBtn);
