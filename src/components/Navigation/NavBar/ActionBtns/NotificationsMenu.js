import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, List } from "@material-ui/core";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

import Notification from "./Notification";
import {
  updateAllNotificationsAsync,
  removeAllNotificationsAsync,
  getNotificationsAsync,
} from "../../../../redux/actions/notificationActions";

const useStyles = makeStyles(() => ({
  iconBtn: {
    padding: "1px",
  },
  notificationsMenu: {
    border: "1rem",
    borderColor: "black",
  },
  notificationBtn: {
    fontSize: "1.7rem",
    padding: "5px",
  },
  notificationsList: {
    width: "25rem",
    textOverflow: "auto",
    maxHeight: 300,
    overflow: "auto",
  },
  headingBtn: {
    textTransform: "none",
  },
  headingBtns: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const NotificationsMenu = ({ dispatch, notifications, currentUser }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [markAllStatus, setmarkAllStatus] = useState(true);
  const [myNotifications, setMyNotifications] = useState(notifications);

  useEffect(() => {
    retrieveNotifications();
  }, [markAllStatus]);

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
    retrieveNotifications();
  };

  const retrieveNotifications = () => {
    dispatch(getNotificationsAsync(currentUser.user._id)).then((res) => {
      setMyNotifications(res.notifications);
    });
  };

  const handleClickMarkAllAsRead = () => {
    if (notifications.length > 0) {
      dispatch(
        updateAllNotificationsAsync(currentUser.user._id, markAllStatus)
      ).then(() => {
        setmarkAllStatus(!markAllStatus);
      });
    }
  };

  const handleClickDeleteAll = () => {
    dispatch(removeAllNotificationsAsync(currentUser.user._id)).then(() => {
      retrieveNotifications();
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateIndividualReadStatus = (_id, newReadStatus) => {
    const updatedNotifications = myNotifications.map((notification) => {
      if (notification._id === _id) {
        notification.isRead = newReadStatus;
      }

      return notification;
    });
    setMyNotifications(updatedNotifications);
  };

  const renderNotifications = (myNotifications) => {
    return myNotifications.map((notification) => {
      return (
        <Notification
          key={notification._id}
          _id={notification._id}
          userId={notification.userId}
          type={notification.type}
          isRead={notification.isRead}
          date={notification.date}
          content={notification.content}
          onUpdateStatus={updateIndividualReadStatus}
        />
      );
    });
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="notifications"
        aria-controls="notifications-menu"
        aria-haspopup="true"
        onClick={handleOpenNotifications}
        className={classes.iconBtn}
      >
        <NotificationsNoneOutlinedIcon className={classes.notificationBtn} />
      </IconButton>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id="notifications-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        className={classes.notificationsMenu}
        onClose={handleClose}
        disableScrollLock={true}
      >
        <div className={classes.headingBtns}>
          <Button
            className={classes.headingBtn}
            onClick={handleClickMarkAllAsRead}
          >
            {`Mark all as ${markAllStatus ? "read" : "unread"}`}
          </Button>
          <Button className={classes.headingBtn} onClick={handleClickDeleteAll}>
            Clear all
          </Button>
        </div>
        <Divider />
        <List className={classes.notificationsList}>
          {renderNotifications(myNotifications)}
        </List>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(NotificationsMenu);
