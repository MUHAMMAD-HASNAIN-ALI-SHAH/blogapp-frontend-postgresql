import { create } from "zustand";
import type { BlogData } from "../interfaces/Interfaces";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

interface DashboardStore {
  myBlogs: BlogData[];
  myStats: {
    totalblogs: number;
    totalviews: number;
    totallikes: number;
    totalcomments: number;
  }
  getMyBlogsLoader: boolean;
  statsLoader: boolean;
  deleteBlogLoader: boolean;
  addBlog: (formData: BlogData) => Promise<void>;
  getMyBlogs: () => void;
  deleteBlog: (blogId: number) => Promise<void>;
  getStats: () => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  myBlogs: [],
  myStats: {
    totalblogs: 0,
    totalviews: 0,
    totallikes: 0,
    totalcomments: 0
  },
  getMyBlogsLoader: false,
  statsLoader: false,
  deleteBlogLoader: false,
  getMyBlogs: async () => {
    try {
      set({ getMyBlogsLoader: true });
      const res = await axiosInstance.get("/api/v6/dashboard/blog");
      set({ myBlogs: res.data.blogs });
    } catch (error) {
      toast.error("Failed to fetch your blogs");
    } finally {
      set({ getMyBlogsLoader: false });
    }
  },
  addBlog: async (formData) => {
    try {
      set((state) => ({ myBlogs: [formData, ...state.myBlogs] }));
    } catch (error) {
      toast.error("Failed to create blog");
    }
  },
  deleteBlog: async (blogId) => {
    try {
      set({ deleteBlogLoader: true });
      const res = await axiosInstance.delete(`/api/v6/dashboard/blog/${blogId}`);
      set((state) => ({
        myBlogs: state.myBlogs.filter((blog) => blog.id !== blogId),
        deleteBlogLoader: false
      }));
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete blog");
    } finally {
      set({ deleteBlogLoader: false });
    }
  },
  getStats: async () => {
    try {
      set({ statsLoader: true });
      const res = await axiosInstance.get("/api/v6/dashboard/stats");
      set({ myStats: res.data.stats });
    } catch (error) {
      toast.error("Failed to fetch stats");
    } finally {
      set({ statsLoader: false });
    }
  }
}));

export default useDashboardStore;
