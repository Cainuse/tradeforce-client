import * as io from "socket.io-client";
import events from "events";

class ChatSocketServer {
  socket = null;
  eventEmitter = new events.EventEmitter();

  createSocketConnection = (userId) => {
    try {
      this.socket = io(process.env.REACT_APP_SOCKET_URL, {
        query: `userId=${userId}`,
        transports: ["websocket"],
      });
      this.socket.emit("status-change", { userId, status: true });
      this.receiveMessage();
      this.receiveNotification();
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

  getStatusChange = () => {
    this.socket.on("status-change-response", (data) => {
      this.eventEmitter.emit("status-change-response", data);
    });
  };

  sendMessage = (message) => {
    this.socket.emit("add-message", message);
  };

  receiveMessage = () => {
    this.socket.on("add-message-response", (data) => {
      this.eventEmitter.emit("add-message-response", data);
    });
  };

  receiveNotification = () => {
    this.socket.on("new-notification", (data) => {
      this.eventEmitter.emit("new-notification", data);
    });
  };

  logout = (userId) => {
    this.socket.emit("logout", { userId });
    this.socket.emit("status-change", { userId, status: false });
    this.socket.on("logout-response", (data) => {
      this.eventEmitter.emit("logout-response", data);
    });
    this.socket.off();
    console.log("logged out");
  };
}

export default new ChatSocketServer();
