import { backendURL } from "./backendURL";

export const fetchByClassId = async (url, classId) => {
  try {
    const response = await fetch(`${backendURL}${url}/by-classId/${classId}`);
    console.log("url", url);
    console.log("classId", classId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { error: `Failed to fetch ${url}: ${error.message}` };
  }
};


