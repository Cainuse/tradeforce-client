import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";

import { setLoading } from "../../redux/actions/loadingActions";
import ChatSocketServer from "../../utils/ChatSocketServer";
import ChatUserInfo from "./ChatUserInfo";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    margin: theme.spacing(1, 0),
  },
  selectedUser: {
    backgroundColor: "#eaf3fb",
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  },
  list: {
    height: "72vh",
    flex: "auto",
    overflow: "hidden",
    "&:hover": {
      overflow: "auto",
    },
  },
  title: {
    fontWeight: 300,
  },
});

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      selectedItemIndex: -1,
      unreadChats: [],
    };
  }

  componentDidMount = () => {
    this.props.setLoading(true);
    const userId = this.props.userId;
    ChatSocketServer.getChatList(userId);
    ChatSocketServer.getStatusChange();
    ChatSocketServer.eventEmitter.on("chat-list-response", this.createChatList);
    ChatSocketServer.eventEmitter.on(
      "status-change-response",
      this.updateUserStatus
    );
    ChatSocketServer.eventEmitter.on(
      "add-message-response",
      this.addUnreadIndicator
    );
  };

  componentWillUnmount = () => {
    ChatSocketServer.eventEmitter.removeListener(
      "chat-list-response",
      this.createChatList
    );
    ChatSocketServer.eventEmitter.removeListener(
      "status-change-response",
      this.updateUserStatus
    );
    ChatSocketServer.eventEmitter.removeListener(
      "add-message-response",
      this.addUnreadIndicator
    );
  };

  addUnreadIndicator = (response) => {
    if (!response.error && response.chatMsg) {
      let senderId = response.chatMsg.fromUserId;
      let userIndex = _.findIndex(
        this.state.chatList,
        (user) => user._id === senderId
      );
      let isOtherUserSelected =
        this.state.selectedItemIndex === -1 ||
        userIndex !== this.state.selectedItemIndex;
      let isUserAlreadyUnread = _.includes(this.state.unreadChats, senderId);
      if (isOtherUserSelected && !isUserAlreadyUnread) {
        this.setState({ unreadChats: [...this.state.unreadChats, senderId] });
      }
    } else {
      let errorMessage = response.message
        ? response.message
        : "Something went wrong";
      console.log(errorMessage);
    }
  };

  updateUserStatus = (response) => {
    if (!response.error && response.userInfo && response.userInfo.user) {
      let userId = response.userInfo.user._id;
      let updatedChatList = this.state.chatList.map((user) => {
        if (user._id === userId) {
          user.isOnline = response.userOnline;
        }
        return user;
      });
      this.setState({ chatList: updatedChatList });
    } else {
      console.log(response.message);
    }
  };

  createChatList = (response) => {
    if (!response.error && response.chatList) {
      let newChatList = response.chatList.chatList;
      this.setState({ chatList: newChatList });
    } else {
      let errorMessage = response.message
        ? response.message
        : "unable to load chat list";
      console.log(errorMessage);
    }
    this.props.setLoading(false);
  };

  selectChatUser = ({ user, idx }) => {
    let updatedUnreadChats = _.filter(
      this.state.unreadChats,
      (userId) => userId !== user._id
    );
    this.setState({ selectedItemIndex: idx, unreadChats: updatedUnreadChats });
    this.props.setSelectedChatUser(user);
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h5" className={classes.title}>
          Conversations
        </Typography>
        {this.state.chatList.length === 0 ? null : (
          <List className={classes.list}>
            {this.state.chatList.map((user, idx) => {
              return (
                <React.Fragment key={idx}>
                  <ListItem
                    key={idx}
                    button
                    onClick={() => this.selectChatUser({ user, idx })}
                    className={clsx(classes.listItem, {
                      [classes.selectedUser]:
                        this.state.selectedItemIndex === idx,
                    })}
                  >
                    <ChatListItem
                      user={user}
                      isUnread={_.includes(this.state.unreadChats, user._id)}
                    />
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        )}
      </React.Fragment>
    );
  }
}

const ChatListItem = ({ user, isUnread }) => {
  return (
    <React.Fragment>
      <ChatUserInfo user={user} hideBadge={false} />
      <Badge invisible={!isUnread} color="error" variant="dot" />
    </React.Fragment>
  );
};

export default connect(null, { setLoading })(withStyles(useStyles)(ChatList));
