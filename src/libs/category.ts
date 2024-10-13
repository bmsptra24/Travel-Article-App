import { CategoryByIdResponse, CategoryResponse } from "../types/category";
import { getToken } from "./auth";

export async function getCategoriesList(): Promise<
  CategoryResponse | undefined
> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/categories`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Categories retrieved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getCategoryById(
  categoryId: string,
): Promise<CategoryByIdResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/categories/${categoryId}`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Category retrieved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteCategory(
  categoryId: string,
): Promise<CategoryByIdResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/categories/${categoryId}`;

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Category deleted successfully");
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createCategory(
  name: string,
): Promise<CategoryByIdResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/categories`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      data: {
        name,
      },
    }),
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Category created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateCategory(
  categoryId: string,
  name: string,
): Promise<CategoryByIdResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/categories/${categoryId}`;

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      data: {
        name,
      },
    }),
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Category updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
