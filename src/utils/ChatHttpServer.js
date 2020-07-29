import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/messages`;

class ChatHttpServer {
  getMessages = (fromUserId, toUserId) => {
    return async () => {
      try {
        const response = await axios.post(BASE_URL, {
          fromUserId: fromUserId,
          toUserId: toUserId,
        });
        return response.data;
      } catch (error) {
        return error;
      }
    };
  };
}

export default new ChatHttpServer();
