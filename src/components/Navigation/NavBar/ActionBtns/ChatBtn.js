import React from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  iconBtn: {
    padding: "1px",
  },
  notificationsMenu: {
    border: "1rem",
    borderColor: "black",
  },
  chatBtn: {
    fontSize: "1.7rem",
    padding: "5px",
  },
  notificationsList: {
    width: "26rem",
    padding: "0",
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

const ChatBtn = () => {
  const history = useHistory();
  const classes = useStyles();

  const redirect = () => {
    history.push({ pathname: "/chat" });
  };

  return (
    <IconButton color="inherit" onClick={redirect} className={classes.iconBtn}>
      <Badge color="primary" variant="dot" visible={false}>
        <MailOutlineIcon className={classes.chatBtn} />
      </Badge>
    </IconButton>
  );
};

export default ChatBtn;
