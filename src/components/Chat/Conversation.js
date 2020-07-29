import React from "react";
import ChatSocketServer from "../../utils/ChatSocketServer";
import ChatHttpServer from "../../utils/ChatHttpServer";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

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
    ChatSocketServer.eventEmitter.on("add-message-response", (response) => {
      console.log(response);
    });
  };

  componentWillUnmount = () => {
    ChatSocketServer.eventEmitter.removeListener(
      "add-message-response",
      () => {}
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

  getMessages = async () => {
    const { currentUser } = this.state;
    try {
      const messagesResponse = await ChatHttpServer.getMessages(
        currentUser._id,
        this.props.selectedChatUser._id
      )();
      this.setState({ conversations: messagesResponse });
    } catch (e) {
      console.log(e);
    }
  };

  handleOnChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("submitted: ", this.state.message);
    // submit message via socket
  };

  render() {
    return (
      <div>
        {this.state.conversations.length > 0
          ? this.state.conversations.map((msg, idx) => {
              return (
                <div key={idx}>
                  <p>{msg.content}</p>
                  <p>From: {msg.fromUserName}</p>
                  <p>To: {msg.toUserName}</p>
                </div>
              );
            })
          : "nothing selected"}
        <Paper component="form">
          <TextField
            onChange={this.handleOnChange}
            placeholder="Type a message"
            fullWidth
            variant="outlined"
          />
          <IconButton
            type="submit"
            aria-label="search"
            onClick={this.handleOnSubmit}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    );
  }
}

export default Conversation;
