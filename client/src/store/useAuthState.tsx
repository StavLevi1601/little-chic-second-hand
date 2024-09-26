import { create } from "zustand";
import { LoginSchema } from "../validations/loginSchema";
import { getToken, isTokenValid, removeToken, setToken } from "../utils/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: LoginSchema | null;
  login: (user: LoginSchema) => void;
  logout: () => void;
  setIsAuthenticated: (value: boolean) => void;
  checkTokenValidity: () => Promise<boolean>;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: getToken() ? true : false,
  user: null,
  login: (user) => {
    set({ isAuthenticated: true, user });
    const token = getToken() ? getToken() : null
    setToken(token) // Save the token to local storage
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
    removeToken(); // Remove the token from local storage
  },
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  checkTokenValidity: async () => {
    const token = getToken();
    if (!token) return false;
    const valid = await isTokenValid();
    return valid;
  },
}));

export default useAuthStore;