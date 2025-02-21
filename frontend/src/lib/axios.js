import axios from "axios";

export const axiosInstance = axios.get({
  baseURL: "http://172.18.43.39:5000/api",
  withCredentials: true,
});
