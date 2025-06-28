import { useEffect } from "react";
import api from "@/services/api";
import { authStore } from "@/store/authStore";

export default function SessionBootstrap({ children }: { children: React.ReactNode }) {
  const setAuth = authStore((s) => s.setAuth);
  const setLoading = authStore((s) => s.setLoading);

  useEffect(() => {
    const token = localStorage.getItem("attendance-auth") 
      ? JSON.parse(localStorage.getItem("attendance-auth")!).state.token 
      : null;

    if (!token) return setLoading(false);

    api.get("/auth/me")
      .then((res) => {
        const { name, email, permissions } = res.data;
        setAuth(token, name, email, permissions);
      })
      .catch(() => {
        authStore.getState().logout();
      })
      .finally(() => setLoading(false));
  }, []);

  return <>{children}</>;
}