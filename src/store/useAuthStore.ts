import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "@/types/user"; // type-only import

interface AuthStore {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: IUser) => set({ user }),
      setToken: (token: string) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useAuthStore;