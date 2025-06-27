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
    const isLoginRoute = err.config?.url?.includes("/auth/login");
    if (!isLoginRoute && err.response?.status === 401) {
      authStore.getState().logout();
      toast.error("Session expired, please log in again.");
      window.location.href = "/login";      // or use navigate()
    }
    return Promise.reject(err);
  }
);

export default api;