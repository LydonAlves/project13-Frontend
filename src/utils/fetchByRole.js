import { backendURL } from "./backendURL";

export const fetchByRole = async (url, userRole) => {
  try {
    const response = await fetch(`${backendURL}${url}/by-userRole/${userRole}`);
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
