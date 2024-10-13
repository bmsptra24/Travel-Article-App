import { CommentsByIdResponse, CommentsResponse } from "../types/comment";
import { getToken } from "./auth";

export async function getCommentsList(): Promise<CommentsResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/comments`;

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
    console.log("Comments retrieved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fungsi baru untuk mendapatkan komentar berdasarkan ID artikel
export async function getCommentsByArticleId(
  articleId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<CommentsResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/comments?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[article]=${articleId}&populate[user]=*&sort[0]=title:desc`;

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
    console.log("Comments by article ID retrieved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getCommentsById(
  categoryId: string,
): Promise<CommentsByIdResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/comments/${categoryId}`;

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
    console.log("Comments retrieved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteComments(categoryId: string): Promise<void> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/comments/${categoryId}`;

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
    console.log("Comments deleted successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createComments(
  articleId: number,
  content: string,
): Promise<CommentsByIdResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/comments`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      data: {
        content,
        article: articleId,
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
    console.log("Comments created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateComments(
  categoryId: string,
  name: string,
): Promise<CommentsByIdResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/comments/${categoryId}`;

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
    console.log("Comments updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
