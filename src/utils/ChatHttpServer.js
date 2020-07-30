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
}

export default new ChatHttpServer();
