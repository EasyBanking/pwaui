import axios from "axios";

const URL = process.env.REACT_APP_API;

const HttpClient = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

HttpClient.interceptors.request.use((config) => {
  const token = localStorage?.getItem("X-AUTH-TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const csrf = localStorage?.getItem("csrf");

  if (config.method !== "get" && csrf) {
    config.headers["x-csrf-token"] = csrf;
  }

  return config;
});

export default HttpClient;
