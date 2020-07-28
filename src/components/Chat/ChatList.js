import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ChatList = () => {
  const classes = useStyles();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {});

  return (
    <div className={classes.root}>
      <List component="nav">
        <ChatListItem userName="TEST" />
      </List>
    </div>
  );
};

const ChatListItem = ({ userName }) => {
  const [isSelected, setSelected] = useState(false);

  const handleSelectToggle = () => {
    setSelected(!isSelected);
  };

  return (
    <ListItem button selected={isSelected} onClick={handleSelectToggle}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={userName} />
    </ListItem>
  );
};

export default ChatList;
