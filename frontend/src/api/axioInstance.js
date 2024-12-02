import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:2000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;