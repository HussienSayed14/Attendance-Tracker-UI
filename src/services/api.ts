import axios from "axios";
import { authStore } from "../store/authStore";
import { toast } from "sonner";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      authStore.getState().logout(); // clear token + user
      toast.error("Session expired, please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;