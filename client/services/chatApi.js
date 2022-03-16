import axios from "axios";

const chatApi = axios.create({
  baseURL: "http://192.168.0.22:3005/api",
});

export default chatApi;
