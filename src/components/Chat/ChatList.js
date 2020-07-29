import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatSocketServer from "../../utils/ChatSocketServer";
import Badge from "@material-ui/core/Badge";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { setLoading } from "../../redux/actions/loadingActions";
import clsx from "clsx";

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
});

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      selectedItemIndex: -1,
    };
  }

  componentDidMount = () => {
    this.props.setLoading(true);
    const userId = this.props.userId;
    ChatSocketServer.getChatList(userId);
    ChatSocketServer.eventEmitter.on("chat-list-response", this.createChatList);
  };

  componentWillUnmount = () => {
    ChatSocketServer.eventEmitter.removeListener(
      "chat-list-response",
      this.createChatList
    );
  };

  createChatList = (response) => {
    if (!response.error) {
      let chatList = this.state.chatList;
      if (!response.singleUser && !response.userDisconnected) {
        chatList = response.chatList.chatList;
        this.setState({ chatList: chatList });
      } else if (response.singleUser && response.userInfo) {
        let userId = response.userInfo.user._id;
        let updatedChatList = this.state.chatList.map((user) => {
          if (user._id === userId) {
            user.isOnline = response.userInfo.user.isOnline;
          }
          return user;
        });
        this.setState({ chatList: updatedChatList });
      } else if (response.userDisconnected) {
        let userId = response.user ? response.user._id : response.userId;
        let updatedChatList = this.state.chatList.map((user) => {
          if (user._id === userId) {
            user.isOnline = false;
          }
          return user;
        });
        this.setState({ chatList: updatedChatList });
      }
    } else {
      console.log("chatlist load error");
    }
    this.props.setLoading(false);
  };

  selectChatUser = ({ user, idx }) => {
    this.setState({ selectedItemIndex: idx });
    this.props.setSelectedChatUser(user);
  };

  render() {
    const { classes } = this.props;
    return this.state.chatList.length === 0 ? null : (
      <React.Fragment>
        <Typography variant="h5">Conversations</Typography>
        <List>
          {this.state.chatList.map((user, idx) => {
            return (
              <React.Fragment key={idx}>
                <ListItem
                  key={idx}
                  button
                  // selected={this.state.selectedItemIndex === idx}
                  onClick={() => this.selectChatUser({ user, idx })}
                  className={clsx(classes.listItem, {
                    [classes.selectedUser]:
                      this.state.selectedItemIndex === idx,
                  })}
                >
                  <ChatListItem user={user} />
                </ListItem>
                {/* {idx !== this.state.chatList.length - 1 ? (
                  <Divider variant="inset" component="li" />
                ) : null} */}
              </React.Fragment>
            );
          })}
        </List>
      </React.Fragment>
    );
  }
}

const ChatListItem = ({ user }) => {
  return (
    <React.Fragment>
      <ListItemIcon>
        <Badge
          color="primary"
          variant="dot"
          invisible={!user.isOnline}
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

export default connect(null, { setLoading })(withStyles(useStyles)(ChatList));
