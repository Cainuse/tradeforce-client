import axios from "axios";

class ChatHttpServer {
  getMessages = (fromUserId, toUserId) => {
    return async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_BASE_URL}/messages`,
          { fromUserId, toUserId }
        );
        return response.data;
      } catch (error) {
        return error;
      }
    };
  };
}

export default new ChatHttpServer();
