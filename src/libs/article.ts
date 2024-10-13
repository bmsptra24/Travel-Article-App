import { ArticleById, ArticlesList } from "../types/article";
import { getToken } from "./auth";

// Function to get a list of articles with pagination and population
export async function getArticles(
  page: number = 1,
  pageSize: number = 10,
  titleFilter?: string,
  categoryFilter?: string,
  userId: "*" | number = "*",
): Promise<ArticlesList | undefined> {
  // ! CAN'T FILTERED
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/articles?`;

  // Build query parameters
  const params = new URLSearchParams({
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
    "populate[comments][populate][user]": "*",
    "populate[user]": userId.toString(),
    "populate[category]": "*",
  });

  // Add filters if provided
  if (titleFilter) {
    params.append("filters[title][$eqi]", titleFilter);
  }
  if (categoryFilter) {
    params.append("filters[category][name][$eqi]", categoryFilter);
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`, // Mengambil token dari local storage
    },
    redirect: "follow" as RequestRedirect,
  };

  try {
    console.log({ requestOptions, params });

    const response = await fetch(`${url}&${params.toString()}`, requestOptions);
    const result = await response.json(); // Mengambil respons dalam bentuk JSON
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to get an article by its ID
export async function getArticleById(
  documentId: string,
): Promise<ArticleById | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/articles/${documentId}`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`, // Mengambil token dari local storage
    },
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to delete an article by its ID
export async function deleteArticle(
  documentId: string,
): Promise<ArticleById | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/articles/${documentId}`;

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
    console.log(`Article with ID ${documentId} has been deleted successfully.`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to create a new article
export async function createArticle(
  title: string,
  description: string,
  coverImageUrl: string,
  categoryId: number,
): Promise<ArticleById | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/articles`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Menetapkan header konten ke JSON
      Authorization: `Bearer ${getToken()}`, // Mengambil token dari local storage
    },
    body: JSON.stringify({
      data: {
        title,
        description,
        cover_image_url: coverImageUrl,
        category: categoryId,
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
    console.log("Article created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to edit an article
export async function editArticle(
  articleId: string,
  title: string,
  description: string,
  coverImageUrl: string,
  categoryId: number,
): Promise<ArticleById | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/articles/${articleId}`;

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      data: {
        title,
        description,
        cover_image_url: coverImageUrl,
        category: categoryId,
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
    console.log("Article updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
