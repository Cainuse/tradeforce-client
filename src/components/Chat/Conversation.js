import React from "react";
import { connect } from "react-redux";
import ScrollToBottom from 'react-scroll-to-bottom';
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import _ from "lodash";

import ChatSocketServer from "../../utils/ChatSocketServer";
import ChatHttpServer from "../../utils/ChatHttpServer";
import { Messages } from "./Messages";
// import  Messages  from "./Messages";


const useStyles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
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
    justifyContent: "flex-start",
    alignItems: "center",
    margin: theme.spacing(2, 0, 2, 2),
  },
  messageContainer: {
    padding: theme.spacing(0, 3),
    height: "80%",
    overflow: "auto",
  },
  conversationContainer: {
    height: "85vh",
  },
  fromUser: {
    color: theme.palette.primary.main,
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

  componentDidMount = () => {
    ChatSocketServer.receiveMessage();
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

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.selectedChatUser === null ||
      this.props.selectedChatUser._id !== prevProps.selectedChatUser._id
    ) {
      this.getMessages();
    }
  };

  receiveMessage = (response) => {
    if (!response.error && response.chatMsg) {
      if (
        !_.find(this.state.conversations, { _id: response.chatMsg._id }) &&
        this.props.selectedChatUser &&
        response.chatMsg.fromUserId === this.props.selectedChatUser._id
      ) {
        this.setState({
          conversations: [...this.state.conversations, response.chatMsg],
        });
      }
    } else {
      let errorMessage = response.message
        ? response.message
        : "Something went wrong";
      console.log(errorMessage);
    }
  };

  getMessages = async () => {
    const { currentUser } = this.state;
    try {
      const messagesResponse = await ChatHttpServer.getMessages(
        currentUser._id,
        this.props.selectedChatUser._id
      );
      this.setState({ conversations: messagesResponse });
    } catch (e) {
      // console.log(e);
    }
  };

  handleOnChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    // submit message via socket
    let message = {
      fromUserId: this.state.currentUser._id,
      toUserId: this.props.selectedChatUser._id,
      content: this.state.message
    };
    ChatSocketServer.sendMessage(message);
    this.setState({
      conversations: [...this.state.conversations, message],
      message: ""
    });
  };

  render() {
    const { classes, selectedChatUser } = this.props;
    return selectedChatUser ? (
      <div className={classes.conversationContainer}>
        <Paper elevation={0} className={classes.userHeader}>
          <ListItemIcon>
            <Badge
              color="primary"
              variant="dot"
              invisible={!selectedChatUser.isOnline}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={selectedChatUser.userName}
                  src={selectedChatUser.profilePic}
                />
              </ListItemAvatar>
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary={`${selectedChatUser.firstName} ${selectedChatUser.lastName}`}
            secondary={selectedChatUser.userName}
          />
        </Paper>
        <Divider/>

        <Messages
          conversations={this.state.conversations}
          classes={classes}
          currentUser={this.state.currentUser}
        />

        <Divider/>
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
    ) : this.props.loading ? null : (
      <div>
        <p>Select a conversation</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Conversation));
