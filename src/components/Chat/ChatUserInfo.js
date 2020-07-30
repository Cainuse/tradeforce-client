import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";

const ChatUserInfo = ({ user, hideBadge }) => {
  const isBadgeHidden = hideBadge || !user.isOnline;

  return (
    <React.Fragment>
      <ListItemIcon>
        <Badge
          color="primary"
          variant="dot"
          invisible={isBadgeHidden}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <ListItemAvatar>
            <Avatar alt={user.userName} src={user.profilePic} />
          </ListItemAvatar>
        </Badge>
      </ListItemIcon>
      <ListItemText
        primary={`${user.firstName} ${user.lastName}`}
        secondary={user.userName}
      />
    </React.Fragment>
  );
};

export default ChatUserInfo;
