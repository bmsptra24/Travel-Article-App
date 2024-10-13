import { create } from "zustand";
import {
  getArticles,
  getArticleById,
  deleteArticle,
  createArticle,
} from "../libs/article";

import { Article, ArticleById, ArticlesList } from "../types/article";

// Define the shape of the article state
interface ArticleState {
  articles: ArticlesList | null; // List of articles
  selectedArticle: Article | null; // Currently selected article
  loading: boolean; // Loading status
  error: string | null; // Error message
  fetchArticles: (
    // Fetch articles with optional filters
    page?: number,
    pageSize?: number,
    titleFilter?: string,
    categoryFilter?: string,
  ) => Promise<void>;
  fetchTopArticlesByComments: () => Promise<void>; // Fetch top articles sorted by comments
  fetchArticlesByUserId: (
    // Fetch articles by user ID
    userId: number,
    page?: number,
    pageSize?: number,
  ) => Promise<void>;
  fetchArticleById: (id: string) => Promise<ArticleById | undefined>; // Fetch article by ID
  removeArticle: (id: string) => Promise<void>; // Remove article by ID
  addArticle: (
    // Add a new article
    title: string,
    description: string,
    coverImageUrl: string,
    categoryId: number,
  ) => Promise<void>;
}

// Create a Zustand store for articles
export const useArticleStore = create<ArticleState>((set) => ({
  articles: null, // Initial state for articles
  loading: false, // Initial loading state
  error: null, // Initial error state
  selectedArticle: null, // Initial state for selected article

  // Fetch articles from the API
  fetchArticles: async (
    page = 1,
    pageSize = 10,
    titleFilter?: string,
    categoryFilter?: string,
  ) => {
    set({ loading: true, error: null });
    try {
      const result: ArticlesList | undefined = await getArticles(
        page,
        pageSize,
        titleFilter,
        categoryFilter,
      );
      if (result) {
        set({ articles: result }); // Update state with fetched articles
      }
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Fetch top articles sorted by the number of comments
  fetchTopArticlesByComments: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getArticles(); // Fetch articles from API
      if (result && result.data) {
        const articlesWithCommentsCount = result.data.map((article) => ({
          ...article,
          commentsCount: article.comments?.length, // Add comments count
        }));
        const sortedArticles = articlesWithCommentsCount.sort(
          (a, b) => b.commentsCount - a.commentsCount,
        );
        const topArticles = sortedArticles.slice(0, 5); // Get top 5 articles
        set({ articles: { ...result, data: topArticles } }); // Update state with top articles
      }
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Fetch articles authored by a specific user
  fetchArticlesByUserId: async (userId: number, page = 1, pageSize = 10) => {
    set({ loading: true, error: null });
    try {
      const result: ArticlesList | undefined = await getArticles(
        page,
        pageSize,
        undefined,
        undefined,
        userId,
      );
      if (result) {
        set({ articles: result }); // Update state with fetched articles
      }
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Fetch a specific article by its ID
  fetchArticleById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const article: ArticleById | undefined = await getArticleById(id);
      set({ selectedArticle: article?.data }); // Update state with selected article
      return article;
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Remove an article by its ID
  removeArticle: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteArticle(id); // Call function to delete article
      set((state) => ({
        articles: {
          ...state.articles!,
          data:
            state.articles?.data.filter(
              (article) => article.documentId !== id,
            ) || [], // Filter out deleted article
        },
      }));
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Add a new article
  addArticle: async (
    title: string,
    description: string,
    coverImageUrl: string,
    categoryId: number,
  ) => {
    set({ loading: true, error: null });
    try {
      const newArticle: ArticleById | undefined = await createArticle(
        title,
        description,
        coverImageUrl,
        categoryId,
      );
      if (newArticle) {
        set((state) => ({
          articles: {
            ...state.articles!,
            data: [...(state.articles?.data || []), newArticle.data], // Add new article to state
          },
        }));
      }
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },
}));
