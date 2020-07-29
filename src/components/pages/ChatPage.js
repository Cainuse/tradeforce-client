import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ChatList from "../Chat/ChatList";
import Grid from "@material-ui/core/Grid";
import Conversation from "../Chat/Conversation";

const ChatPage = (props) => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);

  return (
    <Container>
      <Typography variant="h1">Chat Page</Typography>
      <Grid container>
        <Grid item xs={4}>
          <ChatList
            userId={props.currentUser._id}
            setSelectedChatUser={setSelectedChatUser}
          />
        </Grid>
        <Grid item xs={8}>
          <Conversation
            currentUser={props.currentUser}
            selectedChatUser={selectedChatUser}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user,
});

export default connect(mapStateToProps)(ChatPage);
