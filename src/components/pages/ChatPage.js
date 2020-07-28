import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ChatSocketServer from "../../utils/ChatSocketServer";

const ChatPage = (props) => {
  const { _id, userName } = props.currentUser;

  console.log("=====Chat Page=====");
  console.log("id: ", _id);
  console.log("username: ", userName);

  useEffect(() => {
    console.log("=====useeffect=====");
    ChatSocketServer.createSocketConnection(_id);
    ChatSocketServer.getChatList(_id);
    ChatSocketServer.eventEmitter.on("chat-list-response", (response) => {
      console.log(response);
    });

    return () => {
      ChatSocketServer.eventEmitter.removeListener(
        "chat-list-response",
        () => {}
      );
      ChatSocketServer.logout(_id);
    };
  }, []);

  return (
    <Container>
      <Typography variant="h1">Chat Page</Typography>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user,
});

export default connect(mapStateToProps)(ChatPage);
