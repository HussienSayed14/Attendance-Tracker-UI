import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  name: string | null;
  email: string | null;
  permissions: string[];
  loading: boolean;

  setAuth: (token: string, name: string, email: string, permissions: string[]) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      name: null,
      email: null,
      permissions: [],
      loading: true,

      setAuth: (t, n, e, p) => set({ token: t, name: n, email: e, permissions: p }),
      setLoading: (l) => set({ loading: l }),
      logout: () => set({ token: null, name: null, email: null, permissions: [] }),
    }),
    { name: "attendance-auth" }
  )
);