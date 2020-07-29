import * as io from "socket.io-client";
import events from "events";

class ChatSocketServer {
  socket = null;
  eventEmitter = new events.EventEmitter();

  createSocketConnection = (userId) => {
    try {
      this.socket = io(process.env.REACT_APP_SOCKET_URL, {
        query: `userId=${userId}`,
      });
    } catch (e) {
      alert("Socket connection could not be established");
    }
  };

  getChatList = (userId) => {
    this.socket.emit("chat-list", { userId: userId });
    this.socket.on("chat-list-response", (data) => {
      this.eventEmitter.emit("chat-list-response", data);
    });
  };

  sendMessage = (message) => {
    this.socket.on("add-message", message);
  };

  receiveMessage = () => {
    this.socket.on("add-message-response", (data) => {
      this.eventEmitter.emit("add-message-response", data);
    });
  };

  logout = (userId) => {
    this.socket.emit("logout", { userId });
    this.socket.on("logout-response", (data) => {
      this.eventEmitter.emit("logout-response", data);
    });
    this.socket.off();
    console.log("logged out");
  };
}

export default new ChatSocketServer();
