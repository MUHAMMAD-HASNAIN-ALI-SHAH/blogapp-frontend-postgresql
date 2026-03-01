import { create } from "zustand";
import type { CommentType, HomeBlog } from "../interfaces/Interfaces";
import axiosInstance from "../lib/axios";

interface BlogStore {
  blogs: HomeBlog[];
  comments: CommentType[];
  getHomeBlogsLoader: boolean;
  getBlogsCommentsLoader: boolean;
  deleteCommentLoader: boolean;
  addCommentLoader: boolean;
  getBlogs: () => void;
  getBlogComments: (blogId: string) => void;
  addComment: (blogId: string, comment: string) => void;
  deleteComment: (blogId: string, commentId: string) => void;
}

const useBlogStore = create<BlogStore>((set, get) => ({
  blogs: [],
  getHomeBlogsLoader: false,
  comments: [],
  getBlogsCommentsLoader: false,
  deleteCommentLoader: false,
  addCommentLoader: false,
  getBlogs: async () => {
    try {
      set({ getHomeBlogsLoader: true });
      const response = await axiosInstance.get("/api/v2/blogs");
      set({ blogs: response.data.blogs });
      set({ getHomeBlogsLoader: false });
    } catch (error) {
      set({ getHomeBlogsLoader: false });
      console.error("Error fetching blogs:", error);
      set({ blogs: [] });
    }
  },
  getBlogComments: async (blogId: string) => {
    try {
      set({ getBlogsCommentsLoader: true });
      const response = await axiosInstance.get(`/api/v3/comments/${blogId}`);
      set({ comments: response.data.comments, getBlogsCommentsLoader: false });
    } catch (error) {
      set({ getBlogsCommentsLoader: false });
      console.error("Error fetching comments:", error);
      set({ comments: [] });
    }
  },
  addComment: async (blogId: string, comment: string) => {
    try {
      set({ addCommentLoader: true });
      await axiosInstance.post(`/api/v3/comments/${blogId}`, { comment: comment.trim() });
      get().getBlogComments(blogId);
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      set({ addCommentLoader: false });
    }
  },
  deleteComment: async (blogId: string, commentId: string) => {
    try {
      set({ deleteCommentLoader: true });
      await axiosInstance.delete(`/api/v3/comments/${blogId}/${commentId}`);
      get().getBlogComments(blogId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      set({ deleteCommentLoader: false });
    }
  },
}));

export default useBlogStore;
