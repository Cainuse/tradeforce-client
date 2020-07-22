import React, { useState } from "react";
import { connect } from "react-redux";
import { ListItemAvatar, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
import CancelIcon from "@material-ui/icons/Cancel";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import Button from "@material-ui/core/Button";
import {
  updateNotificationAsync,
  removeNotificationAsync,
} from "../../../../redux/actions/notificationActions";

const useStyles = makeStyles(() => ({
  acceptedIcon: {
    color: "green",
  },
  rejectedIcon: {
    color: "red",
  },
  moreItems: {
    textTransform: "none",
  },
}));

const SeeMoreMenu = ({
  dispatch,
  handleDeleteClick,
  onUpdateStatus,
  _id,
  isRead,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReadClick = () => {
    dispatch(updateNotificationAsync(_id, !isRead)).then(() => {
      onUpdateStatus(_id, !isRead);
    });
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="more-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Button
            color="inherit"
            onClick={handleReadClick}
            className={classes.moreItems}
            startIcon={isRead ? <MarkunreadIcon /> : <CheckIcon />}
          >
            {isRead ? "Mark as unread" : "Mark as read"}
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            color="inherit"
            onClick={handleDeleteClick}
            className={classes.moreItems}
            startIcon={<ClearIcon />}
          >
            Clear
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

const Notification = ({
  dispatch,
  _id,
  type,
  date,
  isRead,
  content,
  key,
  onUpdateStatus,
}) => {
  const classes = useStyles();

  const [isExisting, setIsExisting] = useState(true);

  const handleDeleteClick = () => {
    dispatch(removeNotificationAsync(_id)).then(() => {
      setIsExisting(false);
    });
  };

  const getItemAvatar = (type) => {
    if (type === "newOffering") {
      return <LocalOfferIcon color="primary" />;
    } else if (type === "offeringAccepted") {
      return <CheckBoxIcon className={classes.acceptedIcon} />;
    } else if (type === "offeringRejected") {
      return <CancelIcon className={classes.rejectedIcon} />;
    } else {
      return <ErrorIcon />;
    }
  };

  return isExisting ? (
    <MenuItem selected={!isRead} divider={true} key={key}>
      <ListItemAvatar>{getItemAvatar(type)}</ListItemAvatar>

      <ListItemText
        primary={content}
        primaryTypographyProps={{
          style: { whiteSpace: "normal", wordWrap: "break-word" },
        }}
        secondary={moment(date).format("MMMM Do YYYY, h:mm a")}
      />

      <SeeMoreMenu
        dispatch={dispatch}
        handleDeleteClick={handleDeleteClick}
        onUpdateStatus={onUpdateStatus}
        _id={_id}
        isRead={isRead}
        className={classes.seeMoreMenu}
      />
    </MenuItem>
  ) : null;
};

export default connect()(Notification);
