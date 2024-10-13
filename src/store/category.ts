import { create } from "zustand";
import {
  getCategoriesList,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../libs/category";
import { CategoryData, CategoryResponse } from "../types/category";

// Define the shape of the category state
interface CategoryState {
  categories: CategoryResponse | null; // List of categories
  selectedCategory: CategoryData | null; // Currently selected category
  loading: boolean; // Loading status
  error: string | null; // Error message
  fetchCategories: () => Promise<void>; // Fetch categories from API
  fetchCategoryById: (id: string) => Promise<void>; // Fetch a category by ID
  removeCategory: (id: string) => Promise<void>; // Remove a category by ID
  addCategory: (name: string) => Promise<void>; // Add a new category
  editCategory: (id: string, name: string) => Promise<void>; // Update a category
}

// Create a Zustand store for categories
export const useCategoryStore = create<CategoryState>((set) => ({
  categories: null, // Initial state for categories
  loading: false, // Initial loading state
  error: null, // Initial error state
  selectedCategory: null, // Initial state for selected category

  // Fetch categories from the API
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getCategoriesList();
      if (result) {
        set({ categories: result }); // Update state with fetched categories
      }
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Fetch a specific category by its ID
  fetchCategoryById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const category = await getCategoryById(id);
      set({ selectedCategory: category?.data }); // Update state with selected category
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Remove a category by its ID
  removeCategory: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteCategory(id); // Call function to delete category
      set((state) => ({
        categories: {
          ...state.categories!,
          data:
            state.categories?.data.filter(
              (category) => category.documentId !== id,
            ) || [], // Filter out deleted category
        },
      }));
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Add a new category
  addCategory: async (name: string) => {
    set({ loading: true, error: null });
    try {
      const newCategory = await createCategory(name);
      if (newCategory) {
        set((state) => ({
          categories: {
            ...state.categories!,
            data: [...(state.categories?.data || []), newCategory.data], // Add new category to state
          },
        }));
      }
    } catch (error) {
      set({ error: (error as Error).message }); // Set error state
    } finally {
      set({ loading: false }); // Reset loading state
    }
  },

  // Update a category
  editCategory: async (id: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const updatedCategory = await updateCategory(id, name);
      if (updatedCategory) {
        set((state) => ({
          categories: {
            ...state.categories!,
            data:
              state.categories?.data.map((category) =>
                category.documentId === id ? updatedCategory.data : category,
              ) || [], // Update category in state
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
