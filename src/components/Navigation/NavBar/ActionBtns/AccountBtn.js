import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { IconButton } from "@material-ui/core";

import { unsetUser } from "../../../../redux/actions/userActions";
import GoogleLogoutBtn from "../../../Login/GoogleLogoutBtn";

const getLogoutMenuItem = (currentUser, handleClickLogout) => {
  return currentUser.user.isGoogleUser ? (
    <GoogleLogoutBtn />
  ) : (
    <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
  );
};

function AccountBtn(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickProfile = () => {
    history.push("/profile");
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    props.unsetUser();
    history.push("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={props.iconBtnClass}
        color="inherit"
        aria-label="accountButton"
        onClick={handleClick}
      >
        <AccountCircleOutlinedIcon className={props.accountBtnClass} />
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
  unsetUser: () => dispatch(unsetUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountBtn);
