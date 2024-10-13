import { create } from "zustand";
import { CommentsResponse } from "../types/comment";
import { createComments, getCommentsByArticleId } from "../libs/comment";

// Define the shape of the comment state
interface CommentState {
  comments: CommentsResponse | null; // List of comments
  loading: boolean; // Loading status
  error: string | null; // Error message
  fetchComments: (articleId: string) => Promise<void>; // Fetch comments from API
  createComment: (articleId: number, content: string) => Promise<void>; // Add a new comment
  setComments: (comments: CommentsResponse) => void; // Set comments directly
}

// Create a Zustand store for comments
export const useCommentStore = create<CommentState>((set) => ({
  comments: null, // Initial state for comments
  loading: false, // Initial loading state
  error: null, // Initial error state

  // Fetch comments for a specific article from the API
  fetchComments: async (articleId: string) => {
    set({ loading: true, error: null });
    try {
      const result = await getCommentsByArticleId(articleId);
      if (result) {
        set({ comments: result }); // Update state with fetched comments
      }
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Add a new comment to a specific article
  createComment: async (articleId: number, content: string) => {
    set({ loading: true, error: null });
    try {
      const newComment = await createComments(articleId, content); // Assuming content is the correct parameter
      if (newComment) {
        set((state) => ({
          comments: {
            ...state.comments!,
            data: [...(state.comments?.data || []), newComment.data], // Add new comment to state
          },
        }));
      }
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Set comments directly
  setComments: (comments: CommentsResponse) => {
    set({ comments }); // Update comments state
  },
}));
