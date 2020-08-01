import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import ChatSocketServer from "../../../../utils/ChatSocketServer";
import ChatHttpServer from "../../../../utils/ChatHttpServer";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  iconBtn: {
    padding: "1px",
  },
  chatBtn: {
    fontSize: "1.5rem",
    padding: "5px",
  },
}));

const ChatBtn = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function fetchUnreadCount() {
      const response = await ChatHttpServer.getUnreadCount(
        props.currentUser.user._id
      );
      setUnreadCount(response.unreadCount);
    }

    if (window.location.pathname !== "/chat") {
      fetchUnreadCount();
    } else {
      setUnreadCount(0);
    }
  }, [unreadCount]);

  useEffect(() => {
    ChatSocketServer.eventEmitter.on(
      "add-message-response",
      incrementUnreadCount
    );

    return () => {
      ChatSocketServer.eventEmitter.removeListener(
        "add-message-response",
        incrementUnreadCount
      );
    };
  });

  const incrementUnreadCount = () => {
    if (window.location.pathname !== "/chat") {
      setUnreadCount(unreadCount + 1);
    }
  };

  const redirect = () => {
    setUnreadCount(0);
    history.push({ pathname: "/chat" });
  };

  return (
    <IconButton color="inherit" onClick={redirect} className={classes.iconBtn}>
      <Badge color="error" badgeContent={unreadCount}>
        <SmsOutlinedIcon className={classes.chatBtn} />
      </Badge>
    </IconButton>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(ChatBtn);
