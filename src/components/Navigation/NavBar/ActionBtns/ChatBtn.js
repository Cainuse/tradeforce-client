import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";

const useStyles = makeStyles(() => ({
  iconBtn: {
    padding: "1px",
  },
  notificationsMenu: {
    border: "1rem",
    borderColor: "black",
  },
  chatBtn: {
    fontSize: "1.5rem",
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
      <Badge color="primary" variant="dot" visible="false">
        <SmsOutlinedIcon className={classes.chatBtn} />
      </Badge>
    </IconButton>
  );
};

export default ChatBtn;
