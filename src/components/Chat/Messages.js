import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export const Messages = ({conversations, currentUser, classes}) => {

  if (conversations.length > 0) {
    return (
      <ScrollToBottom className={classes.messageContainer}>
        {conversations.map((msg, idx) => {
            return (
              <div key={idx}>
                <p key={idx}
                   className={
                     msg.fromUserId === currentUser._id
                       ? classes.fromUser
                       : classes.toUser
                   }
                >
                  {msg.content}
                </p>
              </div>
            );
          }
        )}
      </ScrollToBottom>
    );
  }
  return (
    <div className={classes.messageContainer}>
      {"nothing selected"}
    </div>
  );

}