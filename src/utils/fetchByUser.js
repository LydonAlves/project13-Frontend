import { backendURL } from "./backendURL";

export const fetchByUser = async (url, userId) => {
  try {
    const response = await fetch(`${backendURL}${url}/by-userId/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { error: `Failed to fetch ${url}: ${error.message}` };
  }
};
