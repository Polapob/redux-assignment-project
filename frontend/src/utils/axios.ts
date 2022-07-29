import axios from "axios";

console.log("url =", process.env.NEXT_PUBLIC_API_URL);
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default apiClient;
