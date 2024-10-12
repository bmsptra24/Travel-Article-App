import { create } from "zustand";
import {
  getArticles,
  getArticleById,
  deleteArticle,
  createArticle,
} from "../libs/article";
import { Article, ArticleById, ArticlesList } from "../types/article";

interface ArticleState {
  articles: ArticlesList | null;
  selectedArticle: Article | null;
  loading: boolean;
  error: string | null;
  fetchArticles: (
    page?: number,
    pageSize?: number,
    titleFilter?: string,
    categoryFilter?: string,
  ) => Promise<void>;
  fetchArticleById: (id: string) => Promise<ArticleById | undefined>;
  removeArticle: (id: number) => Promise<void>;
  addArticle: (
    title: string,
    description: string,
    coverImageUrl: string,
    categoryId: number,
  ) => Promise<void>;
}

export const useArticleStore = create<ArticleState>((set) => ({
  articles: null,
  loading: false,
  error: null,
  selectedArticle: null,

  // Fetch articles with pagination and filters
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
        set({ articles: result }); // Simpan data artikel di state
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single article by ID
  fetchArticleById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const article: ArticleById | undefined = await getArticleById(id);
      set({ selectedArticle: article?.data });
      return article; // Kembalikan data artikel
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  // Delete an article by ID
  removeArticle: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deleteArticle(id);
      set((state) => ({
        articles: {
          ...state.articles!,
          data:
            state.articles?.data.filter((article) => article.id !== id) || [],
        },
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  // Create a new article
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
            data: [...(state.articles?.data || []), newArticle.data], // Pastikan state.articels tidak null
          },
        }));
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
