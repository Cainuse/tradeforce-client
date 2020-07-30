import React, { useState, useEffect } from "react";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";

export const Messages = ({conversations, currentUser, classes}) => {
  let [messages, setMessages] = useState([]);
  let scrollToBottom = useScrollToBottom();

  useEffect(() => {
    setMessages(conversations);
    scrollToBottom();
  }, [conversations])

  return (
    <ScrollToBottom>
      {messages.map((msg, idx) => {
          console.log(messages)
          return (
            // <div key={idx}>
            <p key={idx}
               className={
                 msg.fromUserId === currentUser._id
                   ? classes.fromUser
                   : classes.toUser
               }
            >
              {msg.content}
            </p>
            // </div>
          );
        }
      )}
    </ScrollToBottom>
  )
}