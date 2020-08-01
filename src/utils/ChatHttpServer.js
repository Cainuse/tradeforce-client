import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/messages`;

class ChatHttpServer {
  getMessages = async (fromUserId, toUserId) => {
    try {
      const config = { params: { fromUserId, toUserId } };
      const response = await axios.get(BASE_URL, config);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  getUnreadCount = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/unread/${userId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  markConversationAsRead = async (fromUserId, toUserId) => {
    try {
      await axios.patch(`${BASE_URL}/markAllAsRead`, { fromUserId, toUserId });
    } catch (error) {
      return error;
    }
  };

  markOneAsRead = async (messageId) => {
    try {
      await axios.patch(`${BASE_URL}/markOneAsRead`, { messageId });
    } catch (error) {
      return error;
    }
  };
}

export default new ChatHttpServer();
