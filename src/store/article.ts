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
  fetchTopArticlesByComments: () => Promise<void>;
  fetchArticlesByUserId: (
    userId: number,
    page?: number,
    pageSize?: number,
  ) => Promise<void>; // Fungsi baru
  fetchArticleById: (id: string) => Promise<ArticleById | undefined>;
  removeArticle: (id: string) => Promise<void>;
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
        set({ articles: result });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchTopArticlesByComments: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getArticles();
      if (result && result.data) {
        const articlesWithCommentsCount = result.data.map((article) => ({
          ...article,
          commentsCount: article.comments?.length,
        }));

        const sortedArticles = articlesWithCommentsCount.sort(
          (a, b) => b.commentsCount - a.commentsCount,
        );

        const topArticles = sortedArticles.slice(0, 5);
        set({ articles: { ...result, data: topArticles } });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

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
        set({ articles: result });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchArticleById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const article: ArticleById | undefined = await getArticleById(id);
      set({ selectedArticle: article?.data });
      return article;
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  removeArticle: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteArticle(id);
      set((state) => ({
        articles: {
          ...state.articles!,
          data:
            state.articles?.data.filter(
              (article) => article.documentId !== id,
            ) || [],
        },
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

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
            data: [...(state.articles?.data || []), newArticle.data],
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
