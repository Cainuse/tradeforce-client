import React, { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";

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
        {conversations.map((msg, idx) => {
          return (
            <div key={idx}>
              <p
                key={idx}
                className={
                  msg.fromUserId === currentUser._id
                    ? classes.fromUser
                    : classes.toUser
                }
              >
                {ReactEmoji.emojify(msg.content)}
              </p>
            </div>
          );
        })}
      </ScrollToBottom>
    );
  }
  return <div className={classes.messageContainer}>{"nothing selected"}</div>;
};

export default Messages;
