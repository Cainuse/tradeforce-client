import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import ChatList from "../Chat/ChatList";
import Grid from "@material-ui/core/Grid";
import Conversation from "../Chat/Conversation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(6),
  },
}));

const ChatPage = (props) => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const classes = useStyles();

  return (
    <Container className={classes.container}>
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
