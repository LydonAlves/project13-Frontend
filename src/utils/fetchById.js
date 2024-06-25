import { backendURL } from "./backendURL";

export const fetchById = async (exerciseType, _id) => {
  try {
    const response = await fetch(`${backendURL}${exerciseType}/${_id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error(`Failed to fetch ${exerciseType}:`, error);
    throw error;
  }
};

