import React, { useState } from "react";
import { connect } from "react-redux";
import { ListItemAvatar, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
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
  actionBtns: {
    display: "flex",
  },
}));

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

  const handleReadClick = () => {
    dispatch(updateNotificationAsync(_id, !isRead)).then(() => {
      onUpdateStatus(_id, !isRead);
    });
  };

  const handleDeleteClick = () => {
    dispatch(removeNotificationAsync(_id)).then(() => {
      setIsExisting(false);
    });
  };

  return isExisting ? (
    <MenuItem selected={!isRead} divider={true} key={key}>
      <ListItemAvatar>
        {type === "newOffering" ? (
          <LocalOfferIcon color="primary" />
        ) : type === "offeringAccepted" ? (
          <CheckCircleIcon className={classes.acceptedIcon} />
        ) : (
          <CancelIcon className={classes.rejectedIcon} />
        )}
      </ListItemAvatar>
      <ListItemText primary={content} secondary={date.toLocaleString()} />
      <Tooltip title={isRead ? "Mark as unread" : "Mark as read"}>
        <IconButton
          color="inherit"
          aria-label="Change read status"
          onClick={handleReadClick}
        >
          {isRead ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          color="inherit"
          aria-label="delete notification"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </MenuItem>
  ) : null;
};

export default connect()(Notification);
