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
import { displayError } from "../../redux/actions/snackbarActions";
import ChatSocketServer from "../../utils/ChatSocketServer";
import ChatUserInfo from "./ChatUserInfo";
import { GENERIC_ERROR, LOAD_CHATLIST_ERROR } from "../../redux/constants/snackbarMessageTypes";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    margin: theme.spacing(1, 0),
    paddingRight: theme.spacing(5),
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
  emptyList: {
    height: "72vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid rgb(0, 0, 0, 0.12)",
    width: "70%",
    padding: theme.spacing(2),
  },
  mainText: {
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  subText: {
    paddingTop: theme.spacing(2),
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
      if (isOtherUserSelected) {
        const updatedUser = _.find(this.state.chatList, { _id: senderId });
        updatedUser.unreadCount++;
        const updatedChatList = _.map(this.state.chatList, (user) => {
          if (user._id === senderId) {
            return updatedUser;
          }
          return user;
        });
        this.setState({ chatList: updatedChatList });
      }
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
      this.props.displayError(GENERIC_ERROR);
    }
  };

  createChatList = (response) => {
    if (!response.error && response.chatList) {
      let newChatList = response.chatList.chatList;
      this.setState({ chatList: newChatList });
    } else {
      this.props.displayError(LOAD_CHATLIST_ERROR);
    }
    this.props.setLoading(false);
  };

  selectChatUser = ({ user, idx }) => {
    let updatedUser = { ...user, unreadCount: 0 };
    let updatedChatList = _.map(this.state.chatList, (entry) => {
      if (entry._id === user._id) {
        return updatedUser;
      }
      return entry;
    });
    this.setState({
      selectedItemIndex: idx,
      chatList: updatedChatList,
    });
    this.props.setSelectedChatUser(user);
  };

  render() {
    const { classes, loading } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h5" className={classes.title}>
          Conversations
        </Typography>
        {this.state.chatList.length !== 0 ? (
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
                    <ChatListItem user={user} />
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        ) : loading ? null : (
          <div className={classes.emptyList}>
            <Typography variant="h5" className={classes.mainText}>
              No conversations have been started yet!
            </Typography>
            <Typography variant="subtitle2" className={classes.subText}>
              Start a conversation through the posting page or by accepting an
              offer.
            </Typography>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const ChatListItem = ({ user }) => {
  return (
    <React.Fragment>
      <ChatUserInfo user={user} hideBadge={false} />
      <Badge badgeContent={user.unreadCount} color="error" />
    </React.Fragment>
  );
};

export default connect(null, { setLoading, displayError })(withStyles(useStyles)(ChatList));
