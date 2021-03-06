import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/messages`;

class ChatHttpServer {
  getMessages = async (fromUserId, toUserId) => {
    try {
      const config = { params: { fromUserId, toUserId } };
      const response = await axios.get(BASE_URL, config);
      return response.data;
    } catch (error) {
      throw new Error("unable to get messages");
    }
  };

  getUnreadCount = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/unread/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("unable to get unread count");
    }
  };

  markConversationAsRead = async (fromUserId, toUserId) => {
    try {
      await axios.patch(`${BASE_URL}/markAllAsRead`, { fromUserId, toUserId });
    } catch (error) {
      throw new Error("unable to mark conversation as read");
    }
  };

  markOneAsRead = async (messageId) => {
    try {
      await axios.patch(`${BASE_URL}/markOneAsRead`, { messageId });
    } catch (error) {
      throw new Error("unable to mark message as read");
    }
  };
}

export default new ChatHttpServer();
