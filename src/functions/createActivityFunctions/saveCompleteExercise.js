import { backendURL } from "../../utils/backendURL";

export const saveCompleteExercise = async (exercise, endpoint) => {
  const headers = {
    "Content-Type": "application/json"
  }

  const apiUrl = `${backendURL}${endpoint}`;

  try {
    const response = await fetch(apiUrl,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(exercise)
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(`${endpoint} saved:`, data);
    return data
  } catch (error) {
    console.error('Error in saving exercise:', error);
    return { error: `Failed to save: ${error.message}` };
  }
}

