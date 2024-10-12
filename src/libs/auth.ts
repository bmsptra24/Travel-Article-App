import { LoginResponse } from "../types/auth";

// Function to get token
export function getToken() {
  return localStorage.getItem("jwt") || "";
}

// Function to login
export async function login(
  identifier: string,
  password: string,
): Promise<LoginResponse> {
  const urlencoded = new URLSearchParams();
  urlencoded.append("identifier", identifier);
  urlencoded.append("password", password);

  const requestOptions: RequestInit = {
    method: "POST",
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_ENDPOINT_URL}/api/auth/local`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Function to get the authenticated user information
export async function getMe(): Promise<void> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/users/me`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}
