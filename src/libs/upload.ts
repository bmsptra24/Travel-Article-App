import { UploadResponse } from "../types/upload";
import { getToken } from "./auth";

// Function to upload a file
export async function uploadFile(
  file: File,
): Promise<UploadResponse | undefined> {
  const url = `${import.meta.env.VITE_ENDPOINT_URL}/api/upload`;

  const formData = new FormData();
  formData.append("files", file);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result);
    return result[0];
  } catch (error) {
    console.error("Error:", error);
  }
}
