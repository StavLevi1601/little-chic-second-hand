import { create } from 'zustand';
import { LoginSchema } from '../validations/loginSchema';
import { getToken, isTokenValid, removeToken, setToken } from '../utils/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: LoginSchema | null;
  login: (user: LoginSchema) => void;
  logout: () => void;
  setUser: (user: LoginSchema | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  checkTokenValidity: () => Promise<boolean>;
  setUserFromToken: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: getToken() ? true : false,
  user: null,
  login: (user) => {
    set({ isAuthenticated: true, user });
    const token = getToken() ? getToken() : null;
    setToken(token); // Save the token to local storage
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
    removeToken(); // Remove the token from local storage
  },

  setUser: (user) => set({ user }),

  setUserFromToken: async () => {
    const token = getToken();
    if (token) {
      try {
        const isValid = await isTokenValid();
        console.log('isValid stav', isValid);

        if (isValid.success) {
          set({ user: isValid.user, isAuthenticated: true });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      } catch (error) {
        console.error('Error validating token:', error);
        set({ user: null, isAuthenticated: false });
      }
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  checkTokenValidity: async () => {
    const token = getToken();
    if (!token) return false;
    return await isTokenValid();
  },
}));

export default useAuthStore;
