import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  name: string | null;
  email: string | null; 
  setAuth: (token: string, name: string, email: string) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      name: null,
      email: null,
      setAuth: (t, n, e) => set({ token: t, name: n, email: e }),
      logout: () => set({ token: null, name: null, email: null}),
    }),
    { name: "attendance-auth" } // saved in localStorage
  )
);