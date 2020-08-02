import React from "react";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import ChatUserInfo from "./ChatUserInfo";

import ChatSocketServer from "../../utils/ChatSocketServer";
import ChatHttpServer from "../../utils/ChatHttpServer";
import Messages from "./Messages";
import { withRouter } from "react-router";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import {
  MESSAGE_EMPTY_ERROR,
  SEND_MESSAGE_ERROR,
  GET_CHAT_MESSAGES_ERROR,
} from "../../redux/constants/snackbarMessageTypes";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "87%",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
  },
  userHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(2, 0, 2, 2),
  },
  messageContainer: {
    padding: theme.spacing(0, 3),
    width: "97%",
    height: "80%",
    overflow: "auto",
    flex: "auto",
  },
  conversationContainer: {
    height: "75vh",
  },
  fromUser: {
    color: theme.palette.primary.main,
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: theme.spacing(2, 2, 2, 0),
  },
  unselected: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "97%",
    height: "80%",
    "& *": {
      fontWeight: 300,
    },
  },
});

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      currentUser: props.currentUser,
      selectedChatUser: props.selectedChatUser,
      conversations: [],
    };
    this.messageContainer = React.createRef();
  }

  componentDidMount = async () => {
    // ChatSocketServer.receiveMessage();
    ChatSocketServer.eventEmitter.on(
      "add-message-response",
      this.receiveMessage
    );
  };

  componentWillUnmount = () => {
    ChatSocketServer.eventEmitter.removeListener(
      "add-message-response",
      this.receiveMessage
    );
  };

  componentDidUpdate = async (prevProps) => {
    if (
      this.props.selectedChatUser &&
      (prevProps.selectedChatUser === null ||
        this.props.selectedChatUser._id !== prevProps.selectedChatUser._id)
    ) {
      this.getMessages();
    }
  };

  receiveMessage = async (response) => {
    if (!response.error && response.chatMsg) {
      if (
        !_.find(this.state.conversations, { _id: response.chatMsg._id }) &&
        this.props.selectedChatUser &&
        response.chatMsg.fromUserId === this.props.selectedChatUser._id
      ) {
        this.setState({
          conversations: [...this.state.conversations, response.chatMsg],
        });
        await ChatHttpServer.markOneAsRead(response.chatMsg._id);
      }
    } else {
      this.props.displayError(SEND_MESSAGE_ERROR);
    }
  };

  getMessages = async () => {
    const { currentUser } = this.state;
    try {
      const messagesResponse = await ChatHttpServer.getMessages(
        currentUser._id,
        this.props.selectedChatUser._id
      );
      await ChatHttpServer.markConversationAsRead(
        this.props.selectedChatUser._id,
        currentUser._id
      );
      this.setState({ conversations: messagesResponse });
    } catch (e) {
      this.props.displayError(GET_CHAT_MESSAGES_ERROR);
    }
  };

  handleOnChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    // submit message via socket
    if (this.state.message.length > 0) {
      let message = {
        fromUserId: this.state.currentUser._id,
        toUserId: this.props.selectedChatUser._id,
        content: this.state.message,
      };
      ChatSocketServer.sendMessage(message);
      this.setState({
        conversations: [...this.state.conversations, message],
        message: "",
      });
    } else {
      this.props.displayError(MESSAGE_EMPTY_ERROR);
    }
  };

  redirectToProfile = () => {
    const { history, selectedChatUser } = this.props;
    history.push(`/profile/user=${selectedChatUser._id}`);
  };

  render() {
    const { classes, selectedChatUser, loading } = this.props;
    return selectedChatUser ? (
      <div className={classes.conversationContainer}>
        <Paper elevation={0} className={classes.userHeader}>
          <ChatUserInfo user={selectedChatUser} hideBadge={true} />
          <Tooltip title="Visit profile">
            <IconButton onClick={this.redirectToProfile}>
              <PersonOutlineIcon />
            </IconButton>
          </Tooltip>
        </Paper>
        <Divider />

        <Messages
          conversations={this.state.conversations}
          classes={classes}
          currentUser={this.state.currentUser}
        />

        <Divider />
        <Paper
          component="form"
          elevation={0}
          className={classes.inputContainer}
          onSubmit={this.handleOnSubmit}
        >
          <InputBase
            inputProps={{ "aria-label": "naked" }}
            onChange={this.handleOnChange}
            placeholder="Type a message"
            fullWidth
            variant="outlined"
            className={classes.input}
            size="small"
            value={this.state.message}
          />
          <IconButton
            type="submit"
            aria-label="submit message"
            onClick={this.handleOnSubmit}
            component="span"
            size="small"
            color="primary"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    ) : loading ? null : (
      <div className={classes.unselected}>
        <Typography variant="h5">Select a conversation</Typography>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(Conversation));
