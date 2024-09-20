import { create } from "zustand";
import { LoginSchema } from "../validations/loginSchema";

interface AuthState {
  isAuthenticated: boolean;
  user: LoginSchema | null;
  login: (user: LoginSchema) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;
