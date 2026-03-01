import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  authLoader: boolean;
  signin: (formData: { email: string; password: string }) => Promise<number>;
  verify: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthenticatedLoading: true,
  authLoader: false,

  signin: async (formData) => {
    try {
      set({ authLoader: true });
      const response = await axiosInstance.post("/api/v1/auth/login", formData);
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      toast.success(response.data.message);
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
      set({ authLoader: false });
      return 0;
    }
  },

  verify: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/verify");
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      set({ isAuthenticatedLoading: false });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false });
      set({ isAuthenticatedLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ user: null, isAuthenticated: false });
      await axiosInstance.get("/api/v1/auth/logout");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Logout failed");
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
