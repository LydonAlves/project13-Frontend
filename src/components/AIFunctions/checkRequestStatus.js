import { backendURL } from "../../utils/backendURL";

export const checkRequestStatus = async (hash, url) => {
  console.log("url", url);
  try {
    const response = await fetch(`${backendURL}openai/${url}/status/${hash}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error checking request status:', error);
    return { error: `Failed to check status: ${error.message}` };
  }
};

