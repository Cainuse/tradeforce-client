import React, { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { SentMessage, ReceivedMessage } from "./Message";

const Messages = ({ conversations, currentUser, classes }) => {
  //UseEffect to force rerender the component when
  // -- user changes to a chat with another user
  // -- new message is added
  useEffect(() => {
    //do nothing
  }, [conversations]);

  if (conversations.length > 0) {
    return (
      <ScrollToBottom className={classes.messageContainer}>
        <div className={classes.messages}>
          {conversations.map((msg, idx) => {
            return msg.fromUserId === currentUser._id ? (
              <SentMessage msg={msg} key={idx} />
            ) : (
              <ReceivedMessage msg={msg} key={idx} />
            );
          })}
        </div>
      </ScrollToBottom>
    );
  }
  return <div className={classes.messageContainer}>{"nothing selected"}</div>;
};

export default Messages;
