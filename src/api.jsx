import axios from "axios";

const api = axios.create({
  //  baseURL: "https://projectmanagementtool-backend-sbgc.onrender.com",
   baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;