import { create } from 'zustand';

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  login: (userData: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({
    user: userData,
    isAuthenticated: true
  }),
  logout: () => set({
    user: null,
    isAuthenticated: false
  }),
}));