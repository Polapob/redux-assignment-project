import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_PORT,
});

export default apiClient;