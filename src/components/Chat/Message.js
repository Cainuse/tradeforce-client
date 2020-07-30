import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactEmoji from "react-emoji";
import clsx from "clsx";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  message: {
    maxWidth: "70%",
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 1),
    display: "flex",
    justifyContent: "flex-start",
  },
  sentMessage: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    borderRadius: theme.spacing(2, 2, 0, 2),
  },
  receivedMessage: {
    backgroundColor: "#f5f6f7",
    justifyContent: "flex-start",
    borderRadius: theme.spacing(2, 2, 2, 0),
  },
  messageText: {
    width: "100%",
    wordWrap: "break-word",
    margin: theme.spacing(2, 1),
    boxSizing: "border-box",
  },
  sentTime: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  messageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  time: {
    color: theme.palette.text.disabled,
  },
}));

const SentMessage = ({ msg }) => {
  const classes = useStyles();
  let time = moment(msg.date).format("hh:mm a");

  return (
    <div className={classes.messageContainer}>
      <div className={clsx(classes.message, classes.sentMessage)}>
        <p className={classes.messageText}>{ReactEmoji.emojify(msg.content)}</p>
      </div>
      <Typography
        variant="caption"
        className={clsx(classes.time, classes.sentTime)}
      >
        {time}
      </Typography>
    </div>
  );
};

const ReceivedMessage = ({ msg }) => {
  const classes = useStyles();
  let time = moment(msg.date).format("hh:mm a");

  return (
    <div className={classes.messageContainer}>
      <div className={clsx(classes.message, classes.receivedMessage)}>
        <p className={classes.messageText}>{ReactEmoji.emojify(msg.content)}</p>
      </div>
      <Typography variant="caption" className={classes.time}>
        {time}
      </Typography>
    </div>
  );
};

export { SentMessage, ReceivedMessage };
