import { backendURL } from "../../../utils/backendURL"

export const saveClassActivity = async (classActivity) => {
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const response = await fetch(
      `${backendURL}classActivity`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(classActivity)
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(`Class activity saved:`, data);
    return data
  } catch (error) {
    console.error('Error in saving class activity:', error);
    return { error: `Failed to save: ${error.message}` };
  }
} 